import { createClient, type Asset, type Entry, type EntryCollection } from 'contentful';

export interface Event {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    startDate: string;
    endDate?: string;
    featuredImage: Asset[];
    shortDescription: string;
    fullDescription?: any; // Rich text field
    category?: string[];
    isFeatured: boolean;
    registrationLink?: string;
    entryFee?: string;
    status?: string[];
    room?: string;
    organizer?: Entry<any>[];
  }
}

export interface SiteStatus {
    isClosed: boolean;
    closureMessage?: string;
}

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

// Only create a client if both space and accessToken are defined.
const client = (space && accessToken)
  ? createClient({
      space: space,
      accessToken: accessToken,
    })
  : null;

export async function getSiteStatus(): Promise<SiteStatus> {
    const entryId = process.env.CONTENTFUL_SITE_STATUS_ENTRY_ID;
    if (!client || !entryId) {
        // If the status entry isn't configured, default to open.
        return { isClosed: false, closureMessage: 'Site status functionality not configured.' };
    }
    try {
        const entry = await client.getEntry(entryId);
        return {
            isClosed: entry.fields.isClosed as boolean,
            closureMessage: entry.fields.closureMessage as string | undefined,
        };
    } catch (error) {
        console.error('Failed to fetch site status from Contentful:', error);
        // On error, default to open to prevent accidental site closure.
        return { isClosed: false, closureMessage: 'Error fetching site status.' };
    }
}


export async function getEvents(): Promise<Event[]> {
  if (!client) {
    return [];
  }

  try {
    const collection: EntryCollection<Event> = await client.getEntries({
      content_type: 'dungeonPubDb',
      order: ['fields.startDate'],
    });
    return collection.items as unknown as Event[];
  } catch (error) {
    console.error("Error fetching events from Contentful:", error);
    throw error;
  }
}

export async function getFeaturedEvent(): Promise<Event | null> {
  if (!client) {
    return null;
  }

  try {
    const collection: EntryCollection<Event> = await client.getEntries({
      content_type: 'dungeonPubDb',
      'fields.isFeatured': true,
      limit: 1,
    });

    if (collection.items.length > 0) {
      return collection.items[0] as unknown as Event;
    }
  } catch (error) {
     console.error("Error fetching featured event from Contentful:", error);
     throw error;
  }

  return null;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
    if (!client) {
       return null;
    }

    try {
        const collection: EntryCollection<Event> = await client.getEntries({
            content_type: 'dungeonPubDb',
            'fields.slug': slug,
            limit: 1,
        });

        if (collection.items.length > 0) {
            return collection.items[0] as unknown as Event;
        }
    } catch (error) {
        console.error(`Error fetching event with slug ${slug} from Contentful:`, error);
        throw error;
    }

    return null;
}

export async function getEventById(id: string): Promise<Event | null> {
    if (!client) {
       return null;
    }

    try {
        const entry = await client.getEntry<Event>(id);
        return entry as unknown as Event;
    } catch (error) {
        console.error(`Error fetching event with ID ${id} from Contentful:`, error);
        if ((error as any).sys?.id === 'NotFound') {
            return null;
        }
        throw error;
    }

    return null;
}
