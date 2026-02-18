'use server';

import { getEventBySlug } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import EventDetailClientPage from './event-detail-client';

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
    const event = await getEventBySlug(params.slug);

    if (!event) {
        notFound();
    }

    return <EventDetailClientPage event={event} />;
}
