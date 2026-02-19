'use server';

import { redirect } from 'next/navigation';

// Individual event pages are no longer used. Redirecting to the main events list.
export default async function EventDetailPage({ params }: { params: { slug: string } }) {
    redirect('/events');
}
