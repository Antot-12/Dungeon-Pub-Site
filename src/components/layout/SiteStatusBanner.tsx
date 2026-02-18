'use server';

import { getSiteStatus } from '@/lib/contentful';
import { AlertTriangle } from 'lucide-react';

export async function SiteStatusBanner() {
  const status = await getSiteStatus();

  if (!status.isClosed) {
    return null;
  }
  
  const defaultMessage = 'Dočasne zatvorené z technických príčin. Čoskoro sme späť!';
  const message = status.closureMessage || defaultMessage;

  return (
    <div className="w-full bg-destructive text-destructive-foreground p-3 text-center font-semibold text-md flex items-center justify-center gap-4">
      <AlertTriangle className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}
