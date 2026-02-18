'use server';

import { getEvents, type Event } from '@/lib/contentful';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';
import { deleteEvent } from '@/lib/actions';

// Helper to determine badge color based on status
function getStatusVariant(status?: string) {
    if (!status) return 'secondary';
    switch (status.toLowerCase()) {
        case 'published':
            return 'default';
        case 'full':
            return 'destructive';
        case 'cancelled':
            return 'outline';
        default:
            return 'secondary';
    }
}

export default async function ManageEventsPage() {
    const allEvents = await getEvents();
    const spaceId = process.env.CONTENTFUL_SPACE_ID;

  return (
    <div className="flex flex-col h-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">Manage Events</h1>
                <p className="mt-2 text-muted-foreground">Create, view, and edit your events.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
                <Button asChild className="flex-1 sm:flex-initial">
                    <Link href="/admin/events/new"><PlusCircle className="mr-2 h-4 w-4" /> Create New Event</Link>
                </Button>
            </div>
        </div>
        
        <Card className="flex-grow">
            <CardHeader>
                <CardTitle>Event List</CardTitle>
                <CardDescription>
                    A list of all scheduled events. For advanced image options, you can still{' '}
                    <a href={`https://app.contentful.com/spaces/${spaceId}/environments/master/entries`} target="_blank" rel="noopener noreferrer" className="underline text-primary/90 hover:text-primary font-medium">
                        manage in Contentful <ExternalLink className="inline-block h-3 w-3" />
                    </a>.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="hidden md:table-cell">Start Date</TableHead>
                                <TableHead className="hidden lg:table-cell">Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allEvents.length > 0 ? (
                                allEvents.map((event) => (
                                <TableRow key={event.sys.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span className="truncate">{event.fields.title}</span>
                                            <span className="text-xs text-muted-foreground md:hidden">
                                                {format(new Date(event.fields.startDate), 'P p', { locale: sk })}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {format(new Date(event.fields.startDate), 'd. MMMM yyyy, HH:mm', { locale: sk })}
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <div className="flex flex-wrap gap-1">
                                            {event.fields.isFeatured && <Badge variant="default" className="text-xs bg-primary/80">Featured</Badge>}
                                            {event.fields.status?.map(s => (
                                                <Badge key={s} variant={getStatusVariant(s)} className="text-xs">{s}</Badge>
                                            )) ?? <Badge variant="secondary" className="text-xs">No Status</Badge>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                             <Button asChild variant="ghost" size="icon" title="Edit Event">
                                                <Link href={`/admin/events/${event.sys.id}/edit`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <form action={deleteEvent.bind(null, event.sys.id)}>
                                                <Button variant="ghost" size="icon" title="Delete Event" type="submit">
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No events found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
