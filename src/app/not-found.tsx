'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="font-headline text-8xl md:text-9xl font-bold text-primary">404</h1>
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
          Page Not Found
        </h2>
        <p className="text-xl text-muted-foreground">
          The page you're looking for has vanished into the dungeon's depths. Perhaps it was taken by a mimic?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild size="lg" className="font-headline text-lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-headline text-lg">
            <Link href="/menu">
              <Search className="mr-2 h-5 w-5" />
              Browse Menu
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
