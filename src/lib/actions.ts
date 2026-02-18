
'use server';

import { z } from 'zod';
import { createClient } from 'contentful-management';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { stringToRichText } from './utils';
import { type Document } from '@contentful/rich-text-types';

const eventFormSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, { message: 'Slug can only contain lowercase letters, numbers, and hyphens.' }),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  startDate: z.string().refine((val) => val && !isNaN(Date.parse(val)), { message: 'Start date is required.' }),
  endDate: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === '' || val == null ? undefined : val)),
  isFeatured: z.boolean().default(false),
  category: z.string().optional(),
  status: z.string().optional(),
  room: z.string().optional(),
  entryFee: z.string().optional(),
  registrationLink: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' || val == null ? undefined : val)),
});

const siteStatusSchema = z.object({
    isClosed: z.boolean().default(false),
    closureMessage: z.string().optional(),
});


// Contentful expects all fields to be wrapped in a locale object.
const formatField = (value: any) => ({ 'en-US': value });
const parseStringToArray = (value?: string) => (value ? value.split(',').map((s) => s.trim()).filter(Boolean) : undefined);

/**
 * Tries to access the Space + Environment, providing detailed errors for configuration issues.
 */
const getSpaceAndEnvironment = async () => {
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
    const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master';
    const host = process.env.CONTENTFUL_CMA_HOST || 'api.contentful.com';

    // 1. Upfront configuration checks
    if (!spaceId) {
        throw new Error('Configuration Error: `CONTENTFUL_SPACE_ID` is missing from your .env.local file.');
    }
    if (!managementToken) {
        throw new Error('Configuration Error: `CONTENTFUL_MANAGEMENT_TOKEN` is missing from your .env.local file. This token is required for editing content.');
    }
    if (!managementToken.startsWith('CFPAT-')) {
        throw new Error(
            'Configuration Error: The `CONTENTFUL_MANAGEMENT_TOKEN` you provided is invalid. ' +
            'It must be a Personal Access Token starting with "CFPAT-". ' +
            'You may be using a read-only Content Delivery API token by mistake.'
        );
    }

    // 2. Attempt to connect and handle specific errors
    try {
        const client = createClient({ accessToken: managementToken, host });
        const space = await client.getSpace(spaceId);
        const environment = await space.getEnvironment(environmentId);
        return environment;
    } catch (error: any) {
        let parsedError;
        try {
            // The error message from contentful-management is often a JSON string.
            parsedError = JSON.parse(error.message);
        } catch (e) {
            // Not a JSON error message, throw the full error for debugging.
            throw new Error(
                'An unexpected error occurred while connecting to Contentful. This could be a network issue or a misconfiguration.\n\n' +
                `Host: ${host}\n` +
                `Full Error Details: ${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}`
            );
        }

        const status = parsedError.status;
        const details = parsedError.details;

        if (status === 404 && details?.type === 'Space') {
            let specificError = `Contentful Connection Failed (404 Not Found): The Space ID "${spaceId}" could not be found on the host "${host}".\n\n`;
            specificError += `Troubleshooting Steps:\n`;
            specificError += `1. Please double-check that your CONTENTFUL_SPACE_ID in .env.local is correct.\n\n`;
            if (host.includes('eu')) {
                specificError += `2. Your app is configured to connect to the EU data center. If your space is on the default US server, please REMOVE the CONTENTFUL_CMA_HOST line from your .env.local file and restart the server.`;
            } else {
                specificError += `2. If your space is hosted in the EU, please add this line to your .env.local file and restart the server:\n`;
                specificError += `   CONTENTFUL_CMA_HOST=api.eu.contentful.com`;
            }
            throw new Error(specificError);
        }

        if (status === 401 && error.name === 'AccessTokenInvalid') {
            throw new Error(`Contentful Authentication Error (401): The CONTENTFUL_MANAGEMENT_TOKEN is invalid or has been revoked. Please generate a new Personal Access Token in Contentful, update your .env.local file, and restart the server.`);
        }
        
        if (status === 401 && error.name === 'OrganizationAccessGrantRequired') {
            throw new Error(
                `Contentful Permissions Error: The access token is valid, but the user does not have access to the organization that owns this space.\n\n` +
                `Troubleshooting Steps:\n` +
                `1. Please ensure the user who generated the Personal Access Token is a member of the correct Contentful organization.\n` +
                `2. You can check organization members under "Organization settings & subscriptions" in the Contentful web app.`
            );
        }

        if (status === 403 && error.name === 'AccessDenied') {
            throw new Error(`Contentful Permissions Error (403): The access token is valid, but it does not have the required permissions for this space. Please ensure the user associated with the token has an Admin or Editor role in this Contentful space.`);
        }

        // Fallback for any other unknown errors
        throw new Error(
            'An unexpected error occurred while connecting to Contentful. This could be a network issue or a misconfiguration.\n\n' +
            `Host: ${host}\n` +
            `Full Error Details: ${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}`
        );
    }
};

export async function updateSiteStatus(prevState: any, formData: FormData) {
    const statusId = process.env.CONTENTFUL_SITE_STATUS_ENTRY_ID;
    if (!statusId) {
        return { message: 'Site status entry ID is not configured in .env.local' };
    }

    const rawData: any = Object.fromEntries(formData.entries());
    rawData.isClosed = rawData.isClosed === 'on';
    
    const validatedFields = siteStatusSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }
    
    const { isClosed, closureMessage } = validatedFields.data;

    try {
        const environment = await getSpaceAndEnvironment();
        const entry = await environment.getEntry(statusId);
        
        entry.fields.isClosed = formatField(isClosed);
        entry.fields.closureMessage = formatField(closureMessage);
        
        const updatedEntry = await entry.update();
        await updatedEntry.publish();
        
        // Revalidate all paths to ensure the banner updates everywhere.
        revalidatePath('/', 'layout');
    } catch (error: any) {
        console.error('Contentful Status Update Error:', error);
        return { message: error.message || 'An unknown error occurred.' };
    }
    
    redirect('/admin/status');
}

export async function createEvent(prevState: any, formData: FormData) {
  const rawData: any = Object.fromEntries(formData.entries());
  rawData.isFeatured = rawData.isFeatured === 'on';

  const validatedFields = eventFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.error('Validation Error:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { ...data } = validatedFields.data;

  try {
    const environment = await getSpaceAndEnvironment();

    const payload: Record<string, any> = {
      title: data.title,
      slug: data.slug,
      startDate: data.startDate,
      endDate: data.endDate,
      shortDescription: data.shortDescription,
      fullDescription: stringToRichText(data.fullDescription),
      isFeatured: data.isFeatured,
      category: parseStringToArray(data.category),
      status: parseStringToArray(data.status),
      room: data.room,
      entryFee: data.entryFee,
      registrationLink: data.registrationLink,
    };

    const fields: any = {};
    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined) {
        fields[key] = formatField(value);
      }
    }

    await environment.createEntry('dungeonPubDb', { fields });
  } catch (error: any) {
    console.error('Contentful Create Error:', error);
    return {
      message: error.message || 'An unknown error occurred while creating the event.',
    };
  }

  revalidatePath('/admin/events');
  revalidatePath('/events');
  revalidatePath(`/events/${data.slug}`);
  redirect('/admin/events');
}

export async function updateEvent(id: string, prevState: any, formData: FormData) {
  const rawData: any = Object.fromEntries(formData.entries());
  rawData.isFeatured = rawData.isFeatured === 'on';

  const validatedFields = eventFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.log('Validation failed:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { ...data } = validatedFields.data;

  try {
    const environment = await getSpaceAndEnvironment();
    const entry = await environment.getEntry(id);

    const payload: Record<string, any> = {
      title: data.title,
      slug: data.slug,
      startDate: data.startDate,
      endDate: data.endDate,
      shortDescription: data.shortDescription,
      fullDescription: stringToRichText(data.fullDescription),
      isFeatured: data.isFeatured,
      category: parseStringToArray(data.category),
      status: parseStringToArray(data.status),
      room: data.room,
      entryFee: data.entryFee,
      registrationLink: data.registrationLink,
    };

    for (const [key, value] of Object.entries(payload)) {
        if (value !== undefined) {
          entry.fields[key] = formatField(value);
        } else {
          delete entry.fields[key];
        }
    }

    await entry.update();
  } catch (error: any)
  {
    console.error('Contentful Update Error:', error);
    return {
       message: error.message || 'An unknown error occurred while updating the event.',
    };
  }

  revalidatePath('/admin/events');
  revalidatePath('/events');
  revalidatePath(`/events/${data.slug}`);
  redirect('/admin/events');
}

export async function deleteEvent(id: string) {
  try {
    const environment = await getSpaceAndEnvironment();
    const entry = await environment.getEntry(id);
    const slug = entry.fields.slug?.['en-US'];

    if (entry.isPublished()) {
      await entry.unpublish();
    }
    await entry.delete();

    revalidatePath('/admin/events');
    revalidatePath('/events');
    if (slug) {
      revalidatePath(`/events/${slug}`);
    }
  } catch (error: any) {
    console.error('Contentful Delete Error:', error);
    return {
       message: error.message || 'An unknown error occurred while deleting the event.',
    };
  }

  redirect('/admin/events');
}
    
