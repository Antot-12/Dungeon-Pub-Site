'use client';

import { EventForm } from '@/components/admin/EventForm';

export default function NewEventPage() {
  return (
    <div>
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">Create New Event</h1>
            <p className="mt-2 text-muted-foreground">Fill out the form below to create a new event.</p>
        </div>
        
        <EventForm />
    </div>
  );
}
