import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, List, ToggleRight } from 'lucide-react';


export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Welcome to the Dungeon Pub admin panel. Here you can manage your events and site status.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <ToggleRight className="h-6 w-6 text-primary/80"/>
                <span>Manage Site Status</span>
            </CardTitle>
            <CardDescription>
              Temporarily close the site and display a banner.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
                <Link href="/admin/status">Go to Status Controls</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <List className="h-6 w-6 text-primary/80"/>
                <span>Manage Events</span>
            </CardTitle>
            <CardDescription>
              View, edit, or delete existing events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
                <Link href="/admin/events">Go to Events</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <PlusCircle className="h-6 w-6 text-primary/80"/>
                <span>Create New Event</span>
            </CardTitle>
            <CardDescription>
              Publish a new event to your website.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild>
                <Link href="/admin/events/new">Create Event</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
