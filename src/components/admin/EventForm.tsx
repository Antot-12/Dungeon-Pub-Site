'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { type Event } from '@/lib/contentful';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { createEvent, updateEvent } from '@/lib/actions';
import { richTextToString } from '@/lib/utils';
import { Label } from '../ui/label';
import { useFormStatus } from 'react-dom';
import { useEffect, useActionState } from 'react';
import { type Document } from '@contentful/rich-text-types';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? (isEditing ? 'Saving...' : 'Creating...') : (isEditing ? 'Save Changes' : 'Create Event')}
        </Button>
    )
}

// Helper to format date for datetime-local input
const formatForInput = (dateString?: string): string => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        // This formats to 'YYYY-MM-DDTHH:mm', which is the format expected by the input
        return format(date, "yyyy-MM-dd'T'HH:mm");
    } catch (e) {
        return '';
    }
}

export function EventForm({ event }: { event?: Event | null; }) {
  const { toast } = useToast();
  const action = event ? updateEvent.bind(null, event.sys.id) : createEvent;
  const [state, formAction] = useActionState(action, { errors: {}, message: null });

  useEffect(() => {
    if (state?.errors && Object.keys(state.errors).length > 0) {
        const errorMessages = Object.values(state.errors).flat().join('\n');
        toast({
            variant: 'destructive',
            title: 'Validation Error',
            description: errorMessages,
        });
    } else if (state?.message) {
         toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: state.message,
        });
    }
  }, [state, toast]);


  return (
     <>
        <Button asChild variant="outline" size="sm" className="mb-4">
            <Link href="/admin/events"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Events</Link>
        </Button>
        <form action={formAction} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" placeholder="e.g., D&D One-Shot Night" defaultValue={event?.fields.title} required />
                            </div>
                            <div>
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" name="slug" placeholder="e.g., dnd-one-shot-2024" defaultValue={event?.fields.slug} required />
                                <p className="text-sm text-muted-foreground mt-1">This is the unique URL part for your event.</p>
                            </div>
                            <div>
                                <Label htmlFor="shortDescription">Short Description</Label>
                                <Textarea id="shortDescription" name="shortDescription" placeholder="A brief summary for the event list page." defaultValue={event?.fields.shortDescription} />
                            </div>
                             <div>
                                <Label htmlFor="fullDescription">Full Description</Label>
                                <Textarea id="fullDescription" name="fullDescription" rows={8} placeholder="The main content for the event detail page. Each new line will be a new paragraph." defaultValue={richTextToString(event?.fields.fullDescription)} />
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Image & Media</CardTitle></CardHeader>
                        <CardContent>
                            <div>
                                <Label>Featured Image</Label>
                                <Input type="file" disabled />
                                <p className="text-sm text-muted-foreground mt-1">
                                    Image uploads are not yet supported in this panel. Please add images via the Contentful web app for now.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-8">
                     <Card>
                        <CardHeader><CardTitle>Schedule</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                           <div>
                                <Label htmlFor="startDate">Start Date & Time</Label>
                                <Input id="startDate" name="startDate" type="datetime-local" defaultValue={formatForInput(event?.fields.startDate)} required />
                           </div>
                           <div>
                                <Label htmlFor="endDate">End Date & Time (Optional)</Label>
                                <Input id="endDate" name="endDate" type="datetime-local" defaultValue={formatForInput(event?.fields.endDate)} />
                           </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Properties</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label htmlFor="isFeatured" className="cursor-pointer">Featured Event</Label>
                                    <p className="text-sm text-muted-foreground">Display this event prominently.</p>
                                </div>
                                <Switch id="isFeatured" name="isFeatured" defaultChecked={event?.fields.isFeatured} />
                            </div>
                             <div>
                                <Label htmlFor="category">Categories</Label>
                                <Input id="category" name="category" placeholder="e.g., Board Games, RPG" defaultValue={event?.fields.category?.join(', ')} />
                                 <p className="text-sm text-muted-foreground mt-1">Comma-separated list.</p>
                            </div>
                             <div>
                                <Label htmlFor="status">Status Tags</Label>
                                <Input id="status" name="status" placeholder="e.g., Full, Cancelled" defaultValue={event?.fields.status?.join(', ')} />
                                 <p className="text-sm text-muted-foreground mt-1">Comma-separated list.</p>
                            </div>
                            <div>
                                <Label htmlFor="room">Room</Label>
                                <Input id="room" name="room" placeholder="e.g., Main Hall" defaultValue={event?.fields.room} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Registration</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                <Label htmlFor="entryFee">Entry Fee</Label>
                                <Input id="entryFee" name="entryFee" placeholder="e.g., 5€ or Free" defaultValue={event?.fields.entryFee} />
                            </div>
                             <div>
                                <Label htmlFor="registrationLink">Registration / Ticket Link</Label>
                                <Input id="registrationLink" name="registrationLink" type="url" placeholder="https://..." defaultValue={event?.fields.registrationLink} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <SubmitButton isEditing={!!event} />
        </form>
     </>
  );
}
