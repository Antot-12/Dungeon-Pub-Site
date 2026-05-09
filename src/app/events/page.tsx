'use server';

import { Facebook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

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
    // This is a placeholder since we don't have translations in 'use server' components yet
    const t = (key: string) => {
        const translations: {[key: string]: string} = {
            'nav.events': 'Podujatia',
            'events.subtitle': 'Úlohy, Turnaje a Stretnutia',
            'events.fb_link_text': 'Všetky detaily a diskusiu nájdete aj na našej Facebook stránke.'
        };
        return translations[key] || key;
    }

  const { data: events, error } = await getFacebookEvents();

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="font-headline font-bold text-5xl md:text-6xl text-primary">{t('nav.events')}</h1>
        <p className="mt-4 text-xl text-muted-foreground">{t('events.subtitle')}</p>
        <a href={`https://www.facebook.com/${process.env.FACEBOOK_PAGE_ID || 'dungeonpub'}/events`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left text-muted-foreground hover:text-primary">
            <Facebook className="h-4 w-4" />
            <span>{t('events.fb_link_text')}</span>
        </a>
      </header>

      <div className="space-y-8">
        {error && (
            <div className="text-center bg-card border border-border p-8 rounded-lg">
                <h3 className="font-headline text-2xl font-bold text-foreground mb-4">Events Temporarily Unavailable</h3>
                <p className="max-w-md mx-auto text-muted-foreground mb-4">
                    We're having trouble loading events from Facebook right now. Please check our{' '}
                    <a
                      href={`https://www.facebook.com/${process.env.FACEBOOK_PAGE_ID || 'dungeonpub'}/events`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      Facebook page
                    </a>
                    {' '}directly for the latest events.
                </p>
                <details className="text-left max-w-md mx-auto mt-4">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">Technical details</summary>
                  <p className="mt-2 text-xs font-mono bg-destructive/10 p-2 rounded-md text-destructive">{error}</p>
                </details>
            </div>
        )}

        {!error && events && events.length === 0 && (
             <div className="text-center text-muted-foreground bg-card p-12 rounded-lg border-2 border-dashed border-border/50">
                <h3 className="font-headline text-2xl font-bold text-primary/90 mb-4">No Upcoming Events</h3>
                <p>There are no events currently scheduled on our Facebook page. Please check back later!</p>
             </div>
        )}

        {!error && events && events.map((event) => (
          <div key={event.id} className="bg-card border border-border/50 rounded-lg overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
            {event.cover && (
              <div className="md:w-1/3 relative h-64 md:h-auto">
                <Image src={event.cover.source} alt={event.name} fill className="object-cover"/>
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="font-headline text-2xl font-bold text-primary mb-2">{event.name}</h2>
              <p className="text-muted-foreground mb-4 font-semibold">
                {new Date(event.start_time).toLocaleString('sk-SK', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              </p>
              <p className="text-foreground/80 mb-4 flex-grow line-clamp-4">
                {event.description}
              </p>
              <Link href={`https://www.facebook.com/events/${event.id}`} target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline self-start mt-auto">
                View on Facebook &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
