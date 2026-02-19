'use server';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ManageEventsPage() {
    
  return (
    <div className="flex flex-col h-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">Manage Events</h1>
                <p className="mt-2 text-muted-foreground">This feature has been removed as Contentful services are no longer in use.</p>
            </div>
        </div>
        
        <Card className="flex-grow">
            <CardHeader>
                <CardTitle>Event List</CardTitle>
                <CardDescription>
                    Event management via Contentful has been disabled.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg overflow-x-auto">
                    <div className="h-48 flex items-center justify-center text-muted-foreground">
                        No events to display.
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
