'use server';

import type { Metadata } from 'next';
import EventsClient from './events-client';

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
type FacebookEvent = {
  id: string;
  name: string;
  description?: string;
  start_time: string;
  cover?: {
    source: string;
  };
};

async function getFacebookEvents() {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    // Silently return error without console.warn during build
    return { error: 'Configuration missing. Server-side environment variables for Facebook integration are not set.' };
  }

  const fields = 'name,description,start_time,cover';
  // Using a specific API version
  const url = `https://graph.facebook.com/v20.0/${pageId}/events?fields=${fields}&access_token=${accessToken}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate every hour
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Facebook API Error:', errorData.error.message);
      return { error: `Facebook API Error: ${errorData.error.message}` };
    }
    const data = await response.json();
    return { data: data.data as FacebookEvent[] };
  } catch (error: any) {
    console.error('Failed to fetch Facebook events:', error);
    return { error: error.message || 'An unknown error occurred.' };
  }
}

export default async function EventsPage() {
  const { data: events, error } = await getFacebookEvents();

  return <EventsClient events={events} error={error} />;
}
