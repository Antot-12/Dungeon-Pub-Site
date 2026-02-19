import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, List, ToggleRight } from 'lucide-react';


export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Welcome to the Dungeon Pub admin panel.</p>

      <div className="mt-8">
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <span>Welcome</span>
            </CardTitle>
            <CardDescription>
              Contentful services have been removed. Event management must now be done via Facebook.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
