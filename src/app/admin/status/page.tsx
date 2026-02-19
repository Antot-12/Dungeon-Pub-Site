import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default async function SiteStatusPage() {
    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">Manage Site Status</h1>
                <p className="mt-2 text-muted-foreground">
                   This feature has been removed as Contentful services are no longer in use.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Site Closure Controls</CardTitle>
                    <CardDescription>
                        This feature relied on Contentful and has been disabled.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground p-8">
                        Feature not available.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
