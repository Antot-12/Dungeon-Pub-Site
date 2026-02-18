'use server';

import { EventForm } from '@/components/admin/EventForm';
import { getEventById } from '@/lib/contentful';
import { notFound } from 'next/navigation';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">Edit Event</h1>
        <p className="mt-2 text-muted-foreground">Editing: <span className="font-semibold">{event.fields.title}</span></p>
      </div>
      
      <EventForm event={event} />
    </div>
  );
}
