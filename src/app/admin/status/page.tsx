import { getSiteStatus } from '@/lib/contentful';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusForm } from '@/components/admin/StatusForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default async function SiteStatusPage() {
    const status = await getSiteStatus();
    const entryId = process.env.CONTENTFUL_SITE_STATUS_ENTRY_ID;
    
    if (!entryId) {
        return (
             <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Configuration Error</AlertTitle>
                <AlertDescription>
                    The `CONTENTFUL_SITE_STATUS_ENTRY_ID` is not set in your `.env.local` file. Please follow the setup instructions to create the Site Status entry in Contentful and add its ID to your environment variables.
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">Manage Site Status</h1>
                <p className="mt-2 text-muted-foreground">
                    Use this toggle to temporarily "close" the public website and display a maintenance banner.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Site Closure Controls</CardTitle>
                    <CardDescription>
                        When closed, a banner will appear at the top of all public pages.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <StatusForm currentStatus={status} />
                </CardContent>
            </Card>
        </div>
    );
}
