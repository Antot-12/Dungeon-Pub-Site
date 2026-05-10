'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Dices, Swords, Camera, GlassWater, MapPin, Clock, Users, Calendar, Facebook, Gamepad2, Mic } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function HomePageClient() {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-tavern');
  const galleryImages = PlaceHolderImages.filter(p => p.imageHint.includes('people') || p.imageHint.includes('game')).slice(0, 3);
  const menuPreviewData = [
    {
      category: t('home.menu.preview.beer'),
      items: [t('home.menu.preview.beer_item1'), t('home.menu.preview.beer_item2')],
    },
    {
      category: t('home.menu.preview.wine'),
      items: [t('home.menu.preview.wine_item1'), t('home.menu.preview.wine_item2')],
    },
    {
      category: t('home.menu.preview.rum'),
      items: [t('home.menu.preview.rum_item1'), t('home.menu.preview.rum_item2')],
    },
    {
      category: t('home.menu.preview.snacks'),
      items: [t('home.menu.preview.snacks_item1'), t('home.menu.preview.snacks_item2')],
    },
  ];

  const openingHours = useMemo(() => ([
    { day: t('days.monday'), hours: '16:00 — 22:00' },
    { day: t('days.tuesday'), hours: '16:00 — 0:00' },
    { day: t('days.wednesday'), hours: '16:00 — 0:00' },
    { day: t('days.thursday'), hours: '16:00 — 0:00' },
    { day: t('days.friday'), hours: '16:00 — 2:00' },
    { day: t('days.saturday'), hours: '16:00 — 2:00' },
    { day: t('days.sunday'), hours: '16:00 — 22:00' },
  ]), [t]);
  
  const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const jsDay = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const dayIndex = jsDay === 0 ? 6 : jsDay - 1; // Convert to Mon-first index (0-6)
      setCurrentDayIndex(dayIndex);
      
      const yesterdayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

      const parseHours = (hoursString: string) => {
        if (!hoursString.includes('—')) return null;
        const parts = hoursString.split(' — ');
        if (parts.length !== 2) return null;
        const [openStr, closeStr] = parts;
        if (!openStr || !closeStr) return null;
        const openParts = openStr.split(':').map(Number);
        const closeParts = closeStr.split(':').map(Number);
        if (openParts.length !== 2 || closeParts.length !== 2) return null;
        const [openH, openM] = openParts;
        const [closeH, closeM] = closeParts;
        if (openH === undefined || openM === undefined || closeH === undefined || closeM === undefined) return null;
        return { openH, openM, closeH, closeM };
      };

      const todayTimes = parseHours(openingHours[dayIndex]?.hours ?? '');
      const yesterdayTimes = parseHours(openingHours[yesterdayIndex]?.hours ?? '');
      
      let currentlyOpen = false;

      // Check if we are in yesterday's opening window (that crosses midnight)
      if (yesterdayTimes && yesterdayTimes.closeH < yesterdayTimes.openH) {
        const yesterdayCloseDate = new Date(); // This is today's date
        yesterdayCloseDate.setHours(yesterdayTimes.closeH, yesterdayTimes.closeM, 0, 0);
        if (now < yesterdayCloseDate) {
          currentlyOpen = true;
        }
      }

      // If not open from yesterday, check today's window
      if (!currentlyOpen && todayTimes) {
        const todayOpenDate = new Date();
        todayOpenDate.setHours(todayTimes.openH, todayTimes.openM, 0, 0);
        
        const todayCloseDate = new Date();
        todayCloseDate.setHours(todayTimes.closeH, todayTimes.closeM, 0, 0);
        
        if (todayTimes.closeH < todayTimes.openH) { // Crosses midnight
          todayCloseDate.setDate(todayCloseDate.getDate() + 1);
        }

        if (now >= todayOpenDate && now < todayCloseDate) {
          currentlyOpen = true;
        }
      }
      
      setIsOpen(currentlyOpen);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);

    return () => clearInterval(interval);
  }, [openingHours]);

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full text-white">
        {heroImage && (
           <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            sizes="100vw"
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
            placeholder={heroImage.blurDataURL ? "blur" : "empty"}
            blurDataURL={heroImage.blurDataURL}
          />
        )}
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-9xl tracking-wider drop-shadow-lg font-extrabold">
            {t('home.hero.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl lg:text-3xl text-neutral-200">
            {t('home.hero.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="font-headline text-lg md:text-xl lg:text-2xl transition-transform hover:scale-105 active:scale-100">
              <Link href="/about">{t('home.hero.discoverButton')}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-headline text-lg md:text-xl lg:text-2xl transition-transform hover:scale-105 active:scale-100">
              <Link href="/menu">{t('home.hero.menuButton')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-20 lg:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16">
            
            <div className="lg:col-span-2 space-y-12">
              <div>
                  <h2 className="font-headline font-bold text-3xl md:text-4xl lg:text-6xl text-center mb-12 text-primary">{t('home.features.title')}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <FeatureCard
                      icon={<Dices className="h-12 w-12 md:h-14 md:w-14 text-primary" />}
                      title={t('home.features.games.title')}
                      description={t('home.features.games.description')}
                      delay={0}
                      />
                      <FeatureCard
                      icon={<Swords className="h-12 w-12 md:h-14 md:w-14 text-primary" />}
                      title={t('home.features.events.title')}
                      description={t('home.features.events.description')}
                      delay={0.1}
                      />
                      <FeatureCard
                      icon={<GlassWater className="h-12 w-12 md:h-14 md:w-14 text-primary" />}
                      title={t('home.features.drinks.title')}
                      description={t('home.features.drinks.description')}
                      delay={0.2}
                      />
                      <FeatureCard
                      icon={<Camera className="h-12 w-12 md:h-14 md:w-14 text-primary" />}
                      title={t('home.features.community.title')}
                      description={t('home.features.community.description')}
                      delay={0.3}
                      />
                  </div>
              </div>
            </div>

            <div className="lg:col-span-1 lg:sticky lg:top-28" id="hours">
              <div className="flex flex-col items-center text-center bg-card p-6 rounded-lg border border-border/50 transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
                <h3 className="font-headline font-bold text-3xl md:text-3xl lg:text-4xl text-primary flex items-center gap-3 whitespace-nowrap">
                  <Clock className="h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10" />
                  {t('home.hours.title')}
                </h3>
                <div className="mt-6 w-full">
                  {isOpen !== null && (
                    <div className="flex items-center justify-center gap-3 mb-6 pb-6 border-b border-border/50" aria-live="polite" aria-atomic="true">
                      <span className={cn(
                        "h-3.5 w-3.5 rounded-full animate-pulse",
                        isOpen ? "bg-green-500" : "bg-red-500"
                      )}></span>
                      <p className="text-xl font-semibold">
                        {isOpen ? t('home.hours.openNow') : t('home.hours.closedNow')}
                      </p>
                    </div>
                  )}
                  <ul className="space-y-2 text-lg">
                    {openingHours.map((item, index) => (
                      <li key={item.day} className={cn(
                        "flex justify-between items-center p-3 rounded-lg transition-colors -mx-3 -my-1",
                        index === currentDayIndex && "bg-primary/10"
                        )}>
                        <span className={cn(
                            "font-semibold",
                            index === currentDayIndex ? "text-primary" : "text-foreground"
                        )}>{item.day}</span>
                        <span className="font-mono text-muted-foreground">{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="collaborations" className="w-full py-12 md:py-20 lg:py-24 bg-card/50">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
                <h2 className="font-headline font-bold text-3xl md:text-4xl lg:text-6xl text-primary flex items-center gap-3">
                  <Users className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" />
                  {t('home.partners.title')}
                </h2>
                <p className="mt-2 max-w-xl text-base md:text-lg lg:text-xl text-muted-foreground">{t('home.partners.subtitle')}</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <PartnerCard
                  icon={<Gamepad2 className="h-14 w-14 md:h-16 md:w-16 text-primary/80" />}
                  title={t('home.partners.nero.title')}
                  description={t('home.partners.nero.description')}
                  buttonText={t('home.partners.nero.button')}
                  buttonLink="http://www.nerogames.sk"
                  delay={0}
                />
                <PartnerCard
                  icon={<Mic className="h-14 w-14 md:h-16 md:w-16 text-primary/80" />}
                  title={t('home.partners.comedy.title')}
                  description={t('home.partners.comedy.description')}
                  buttonText={t('home.partners.comedy.button')}
                  buttonLink="https://www.martinhatala.sk/blog/prvy-comedy-dungeon-stand-up/"
                  delay={0.2}
                />
            </div>
        </div>
      </section>

      <section id="menu-preview" className="w-full py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
                <h2 className="font-headline font-bold text-3xl md:text-4xl lg:text-6xl text-primary">{t('home.menu.title')}</h2>
                <p className="mt-2 max-w-xl text-base md:text-lg lg:text-xl text-muted-foreground">{t('home.menu.subtitle')}</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {menuPreviewData.map(category => (
                    <div key={category.category} className="rounded-lg bg-card p-6 border border-border/50 transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-2">
                        <h3 className="font-headline text-xl md:text-xl lg:text-2xl font-bold text-primary mb-4">{category.category}</h3>
                        <ul className="space-y-2 text-base md:text-base lg:text-base text-muted-foreground">
                            {category.items.map(item => <li key={item} className="flex items-center gap-2"><span>-</span> {item}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="font-headline text-lg md:text-xl lg:text-2xl transition-transform hover:scale-105 active:scale-100">
                    <Link href="/menu">{t('home.menu.fullMenuButton')}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-headline text-lg md:text-xl lg:text-2xl transition-transform hover:scale-105 active:scale-100">
                    <Link href="/menu/photo">{t('home.menu.photoMenuButton')}</Link>
                </Button>
            </div>
        </div>
      </section>

      <section id="gallery-preview" className="w-full py-12 md:py-20 lg:py-24 bg-card/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-headline font-bold text-3xl md:text-4xl lg:text-6xl text-primary">{t('home.gallery.title')}</h2>
            <p className="mt-2 max-w-xl text-base md:text-lg lg:text-xl text-muted-foreground">{t('home.gallery.subtitle')}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
             {galleryImages.map((image, index) => (
                <Link href="/gallery" key={image.id}>
                    <div className="group relative block h-64 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint={image.imageHint}
                            placeholder={image.blurDataURL ? "blur" : "empty"}
                            blurDataURL={image.blurDataURL}
                        />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    </div>
                </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="font-headline text-lg md:text-xl lg:text-2xl border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-transform hover:scale-105 active:scale-100">
                <Link href="/gallery">{t('home.gallery.button')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="events" className="w-full py-12 md:py-20 lg:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-headline font-bold text-3xl md:text-4xl lg:text-6xl text-primary flex items-center gap-3">
              <Calendar className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" />
              {t('nav.events')}
            </h2>
            <p className="mt-2 max-w-xl text-base md:text-lg lg:text-2xl text-muted-foreground">{t('events.subtitle')}</p>
            <Button asChild size="lg" className="mt-8 font-headline text-lg md:text-xl lg:text-2xl transition-transform hover:scale-105 active:scale-100">
                <Link href="/events">{t('home.events.seeAllButton')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="location" className="w-full py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-headline font-bold text-3xl md:text-4xl lg:text-6xl text-primary">{t('home.location.title')}</h2>
            <p className="mt-2 max-w-2xl text-base md:text-lg lg:text-2xl text-muted-foreground leading-relaxed">{t('home.location.subtitle')}</p>
            <div className="mt-8">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Štefánikova+869%2F14+Bratislava"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center flex-wrap justify-center gap-3 text-lg md:text-xl lg:text-2xl font-headline text-foreground bg-card border border-border/50 rounded-lg px-6 py-4 transition-all duration-300 hover:bg-card/80 hover:border-primary/50 hover:-translate-y-1 text-center"
              >
                <MapPin className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-primary" />
                <span>Štefánikova 869/14, Bratislava</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay = 0 }: { icon: React.ReactNode; title: string; description: string; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center text-center p-6 md:p-8 rounded-lg bg-card/80 transition-all duration-300 hover:-translate-y-2 border border-border/30",
        isHovered && "shadow-lg shadow-primary/10 border-primary/35 bg-card"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? {
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.1, 1.1, 1.1, 1]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <h3 className="font-headline font-bold text-xl md:text-2xl lg:text-2xl mt-4 mb-2">{title}</h3>
      <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed">{description}</p>
    </motion.div>
  )
}

function PartnerCard({
  icon,
  title,
  description,
  buttonText,
  buttonLink,
  delay = 0
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center text-center gap-4 p-6 md:p-8 rounded-lg bg-card border border-border/50 h-full transition-all duration-300 hover:-translate-y-2",
        isHovered && "shadow-xl shadow-primary/15 border-primary/40"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? {
          rotate: [0, 5, -5, 5, 0],
          scale: [1, 1.15, 1.15, 1.15, 1],
          y: [0, -5, -5, -5, 0]
        } : {}}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        {icon}
      </motion.div>
      <h3 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-primary/90">{title}</h3>
      <p className="text-muted-foreground flex-grow text-base md:text-lg lg:text-xl leading-relaxed">
        {description}
      </p>
      <Button asChild variant="outline" className="text-base md:text-base lg:text-lg">
        <a href={buttonLink} target="_blank" rel="noopener noreferrer">{buttonText}</a>
      </Button>
    </motion.div>
  );
}
