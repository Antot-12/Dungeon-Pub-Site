'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, MapPin, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/LOGO_BIG_B.svg';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Footer() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

  return (
    <footer className="w-full bg-secondary" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="mb-4" aria-label="Dungeon Pub home">
              <Image src={Logo} alt="Dungeon Pub Logo" className="h-24 w-auto" />
            </Link>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-xs">
              {t('home.hero.subtitle')}
            </p>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            <nav aria-label="Footer navigation">
              <h3 className="font-headline font-bold text-lg md:text-xl lg:text-2xl text-primary mb-4">{t('footer.navigation')}</h3>
              <ul className="space-y-3 text-sm md:text-base lg:text-lg">
                <li><Link href="/" className="text-muted-foreground transition-colors hover:text-primary">{t('nav.home')}</Link></li>
                <li><Link href="/menu" className="text-muted-foreground transition-colors hover:text-primary">{t('nav.menu')}</Link></li>
                <li><Link href="/events" className="text-muted-foreground transition-colors hover:text-primary">{t('nav.events')}</Link></li>
                <li><Link href="/gallery" className="text-muted-foreground transition-colors hover:text-primary">{t('nav.gallery')}</Link></li>
                <li><Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">{t('nav.about')}</Link></li>
              </ul>
            </nav>

            <nav aria-label="Quick links">
              <h3 className="font-headline font-bold text-lg md:text-xl lg:text-2xl text-primary mb-4">{t('footer.quick_links')}</h3>
              <ul className="space-y-3 text-sm md:text-base lg:text-lg">
                  <li><Link href="/#features" className="text-muted-foreground transition-colors hover:text-primary">{t('home.features.title')}</Link></li>
                  <li><Link href="/#hours" className="text-muted-foreground transition-colors hover:text-primary">{t('home.hours.title')}</Link></li>
                  <li><Link href="/#menu-preview" className="text-muted-foreground transition-colors hover:text-primary">{t('home.menu.title')}</Link></li>
                  <li><Link href="/#gallery-preview" className="text-muted-foreground transition-colors hover:text-primary">{t('home.gallery.title')}</Link></li>
              </ul>
            </nav>

            <div>
              <h3 className="font-headline font-bold text-lg md:text-xl lg:text-2xl text-primary mb-4">{t('footer.contact')}</h3>
              <address className="not-italic">
                <ul className="space-y-3 text-sm md:text-base lg:text-lg">
                  <li>
                    <a href="https://www.google.com/maps/search/?api=1&query=Štefánikova+869%2F14+Bratislava" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center sm:justify-start gap-2 text-muted-foreground transition-colors hover:text-primary">
                      <MapPin className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" aria-hidden="true" />
                      <span>Štefánikova 869/14, BA</span>
                    </a>
                  </li>
                  <li className="flex items-center justify-center sm:justify-start gap-4 pt-2">
                      <Link href="https://www.facebook.com/dungeonpub/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
                          <motion.div
                            animate={{
                              y: [0, -3, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 5,
                            }}
                          >
                            <Facebook className="h-6 w-6 text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110" aria-hidden="true" />
                          </motion.div>
                      </Link>
                      <Link href="https://www.instagram.com/dungeon_pub" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram profile">
                          <motion.div
                            animate={{
                              y: [0, -3, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 5,
                              delay: 0.3,
                            }}
                          >
                            <Instagram className="h-6 w-6 text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110" aria-hidden="true" />
                          </motion.div>
                      </Link>
                  </li>
                </ul>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 text-center text-sm md:text-base lg:text-lg text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Dungeon Pub. {t('footer.rights')}{' '}
            | Developed by <a href="https://github.com/Antot-12" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Antot_12</a>
            .
          </p>
        </div>
      </div>
      {isVisible && (
            <Button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-100 z-50"
                variant="default"
                size="icon"
                aria-label="Scroll to top"
            >
                <ArrowUp className="h-7 w-7" aria-hidden="true" />
            </Button>
        )}
    </footer>
  );
}
