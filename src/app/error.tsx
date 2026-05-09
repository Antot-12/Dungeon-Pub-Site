'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-destructive" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
          Something Went Wrong
        </h1>
        <p className="text-xl text-muted-foreground">
          A wild error appeared! Our dungeon masters have been notified and are working on a fix.
        </p>
        {error.digest && (
          <p className="text-sm text-muted-foreground font-mono bg-muted p-3 rounded-md">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button onClick={reset} size="lg" className="font-headline text-lg">
            Try Again
          </Button>
          <Button asChild size="lg" variant="outline" className="font-headline text-lg">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
