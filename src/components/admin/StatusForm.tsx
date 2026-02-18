'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { updateSiteStatus } from '@/lib/actions';
import { type SiteStatus } from '@/lib/contentful';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Saving...' : 'Save Status'}
        </Button>
    )
}

export function StatusForm({ currentStatus }: { currentStatus: SiteStatus }) {
    const { toast } = useToast();
    const [state, formAction] = useActionState(updateSiteStatus, { message: null });

    useEffect(() => {
        if (state?.message) {
            toast({
                variant: 'destructive',
                title: 'An error occurred',
                description: state.message,
            });
        } else if (state === null) {
             toast({
                title: 'Status Updated',
                description: 'The site status has been saved successfully.',
             });
        }
    }, [state, toast]);

    return (
        <form action={formAction} className="space-y-6">
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="isClosed" className="text-base cursor-pointer">Close The Pub</Label>
                    <p className="text-sm text-muted-foreground">
                        Turn this on to display the maintenance banner.
                    </p>
                </div>
                <Switch 
                    id="isClosed" 
                    name="isClosed" 
                    defaultChecked={currentStatus.isClosed}
                    aria-label="Toggle site closure"
                />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="closureMessage">Closure Message (Optional)</Label>
                <Textarea 
                    id="closureMessage"
                    name="closureMessage"
                    placeholder="e.g., Closed for a private event tonight. See you tomorrow!"
                    defaultValue={currentStatus.closureMessage}
                />
                <p className="text-sm text-muted-foreground">If you leave this blank, a default message will be shown.</p>
            </div>
            
            <div className="flex items-center gap-4">
                <SubmitButton />
                <div 
                    className={cn(
                        "flex items-center gap-2 text-sm transition-opacity",
                         useFormStatus().pending ? 'opacity-0' : 'opacity-100'
                    )}
                >
                    {currentStatus.isClosed ? (
                        <>
                            <AlertCircle className="h-5 w-5 text-destructive" />
                            <span className="text-destructive font-semibold">Site is currently CLOSED</span>
                        </>
                    ) : (
                        <>
                           <CheckCircle2 className="h-5 w-5 text-green-500" />
                           <span className="font-semibold text-green-500">Site is currently OPEN</span>
                        </>
                    )}
                </div>
            </div>
        </form>
    )
}
