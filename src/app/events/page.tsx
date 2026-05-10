'use server';

import type { Metadata } from 'next';
import EventsClient from './events-client';
import { getUpcomingRecurringEvents, type RecurringEvent } from '@/data/recurring-events';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Events',
    description: 'Upcoming events at Dungeon Pub - RPG sessions, board game tournaments, quiz nights, stand-up comedy, and themed parties.',
    openGraph: {
      title: 'Events | Dungeon Pub',
      description: 'Upcoming events - RPG sessions, board game tournaments, quiz nights, and themed parties.',
    },
  };
}

// NOTE: This is a simplified type. The actual API response is more complex.
export type FacebookEvent = {
  id: string;
  name: string;
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
  start_time: string;
  cover?: {
    source: string;
  };
  type?: 'quiz' | 'tournament' | 'rpg' | 'comedy' | 'music' | 'boardgame' | 'other';
  isRecurring?: boolean;
};

async function getFacebookEvents() {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    // Return null to indicate no Facebook integration
    return { data: null, error: null };
  }

  const fields = 'name,description,start_time,cover';
  // Using a specific API version
  const url = `https://graph.facebook.com/v20.0/${pageId}/events?fields=${fields}&access_token=${accessToken}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate every hour
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Facebook API Error:', errorData.error.message);
      return { data: null, error: `Facebook API Error: ${errorData.error.message}` };
    }
    const data = await response.json();
    return { data: data.data as FacebookEvent[], error: null };
  } catch (error: any) {
    console.error('Failed to fetch Facebook events:', error);
    return { data: null, error: error.message || 'An unknown error occurred.' };
  }
}

/**
 * Convert recurring events to FacebookEvent format for the client
 */
function convertRecurringToFacebookEvents(recurringEvents: Array<RecurringEvent & { date: Date }>): FacebookEvent[] {
  return recurringEvents.map(event => ({
    id: `recurring-${event.id}-${event.date.getTime()}`,
    name: event.name,
    nameEn: event.nameEn,
    description: event.description,
    descriptionEn: event.descriptionEn,
    start_time: event.date.toISOString(),
    cover: event.imageUrl ? { source: event.imageUrl } : undefined,
    type: event.type,
    isRecurring: true
  }));
}

export default async function EventsPage() {
  // Try to get Facebook events first
  const { data: facebookEvents, error } = await getFacebookEvents();

  // Get recurring events as fallback/supplement
  const recurringEventsWithDates = getUpcomingRecurringEvents(60); // Next 60 days
  const recurringEvents = convertRecurringToFacebookEvents(recurringEventsWithDates);

  // Combine events
  let combinedEvents: FacebookEvent[] = [];

  if (facebookEvents && facebookEvents.length > 0) {
    // If we have Facebook events, use them
    combinedEvents = facebookEvents;
  } else {
    // Otherwise, use recurring events
    combinedEvents = recurringEvents;
  }

  // If Facebook events exist but are few, merge with recurring events
  if (facebookEvents && facebookEvents.length > 0 && facebookEvents.length < 5) {
    // Add recurring events that don't conflict with Facebook events
    const fbEventNames = new Set(facebookEvents.map(e => e.name.toLowerCase()));
    const nonConflictingRecurring = recurringEvents.filter(re =>
      !fbEventNames.has(re.name.toLowerCase())
    );
    combinedEvents = [...facebookEvents, ...nonConflictingRecurring];
  }

  // Sort by date
  combinedEvents.sort((a, b) =>
    new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );

  return <EventsClient events={combinedEvents} error={error} hasRecurringEvents={recurringEvents.length > 0} />;
}
