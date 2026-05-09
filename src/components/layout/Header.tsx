'use client';

import Link from 'next/link';
import {
  Menu as MenuIcon,
  Home,
  ScrollText,
  Calendar,
  Images,
  BookOpenText,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button';
import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Logo from '@/LOGO_BIG_B.svg';
import { useHaptic } from '@/hooks/useHaptic';

export function Header() {
  const { t } = useLanguage();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const { triggerHaptic } = useHaptic();
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);

  const navItems = useMemo(() => [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/menu', label: t('nav.menu'), icon: ScrollText },
    { href: '/events', label: t('nav.events'), icon: Calendar },
    { href: '/gallery', label: t('nav.gallery'), icon: Images },
    { href: '/about', label: t('nav.about'), icon: BookOpenText },
  ], [t]);

  // Swipe to close functionality
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (isSheetOpen) {
        touchStartX.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isSheetOpen) {
        touchCurrentX.current = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = () => {
      if (isSheetOpen) {
        const swipeDistance = touchCurrentX.current - touchStartX.current;
        // If swiped right more than 100px, close the sheet
        if (swipeDistance > 100) {
          triggerHaptic('selection');
          setSheetOpen(false);
        }
        touchStartX.current = 0;
        touchCurrentX.current = 0;
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isSheetOpen, triggerHaptic]);

  const NavLinks = ({ className, showIcons = false }: { className?: string, showIcons?: boolean }) => {
    const pathname = usePathname();
    return (
      <nav className={cn("flex items-center gap-6 text-lg", className)} aria-label="Main navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSheetOpen(false)}
            aria-current={pathname === item.href ? 'page' : undefined}
            className={cn(
              'font-headline font-bold tracking-wide transition-all duration-200 hover:text-primary transform hover:-translate-y-0.5',
              showIcons && 'flex items-center gap-4', // Add gap and flex for icons
              pathname === item.href ? 'text-primary' : 'text-foreground'
            )}
          >
            {showIcons && <item.icon className="h-6 w-6" aria-hidden="true" />}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" onClick={() => setSheetOpen(false)}>
           <Image src={Logo} alt="Dungeon Pub Logo" className="h-20 w-auto" priority />
        </Link>
        
        <div className="hidden md:flex items-center gap-4">
            <NavLinks />
            <LanguageSwitcher />
        </div>

        <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card backdrop-blur-xl" aria-label="Mobile navigation">
                    <SheetHeader>
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col h-full">
                      <div className="mb-8">
                        <Link href="/" className="flex items-center" onClick={() => setSheetOpen(false)}>
                           <Image src={Logo} alt="Dungeon Pub Logo" className="h-20 w-auto" />
                        </Link>
                      </div>

                      <NavLinks className="flex-col items-start gap-8 text-2xl" showIcons={true} />
                      
                      <div className="mt-auto pt-6 space-y-6">
                        <div className="h-px bg-border" />
                        <div className="flex justify-center">
                          <LanguageSwitcher />
                        </div>
                      </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

      </div>
    </header>
  );
}
