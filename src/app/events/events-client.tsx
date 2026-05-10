'use client';

import { Facebook, Calendar, Trophy, Dices, Swords, Clock, MapPin, Users, Search, Filter, Grid3x3, List, Scroll, Shield, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState, useMemo, useEffect } from 'react';

type FacebookEvent = {
  id: string;
  name: string;
  description?: string;
  start_time: string;
  cover?: {
    source: string;
  };
};

type EventType = 'all' | 'quiz' | 'tournament' | 'rpg' | 'comedy' | 'music' | 'other';

type ViewMode = 'list' | 'grid';

interface EventsClientProps {
  events?: FacebookEvent[];
  error?: string;
}

// Helper function to detect event type from name/description
function detectEventType(event: FacebookEvent): EventType {
  const text = `${event.name} ${event.description || ''}`.toLowerCase();

  if (text.includes('kvíz') || text.includes('quiz')) return 'quiz';
  if (text.includes('turnaj') || text.includes('tournament')) return 'tournament';
  if (text.includes('rpg') || text.includes('d&d') || text.includes('dnd')) return 'rpg';
  if (text.includes('comedy') || text.includes('stand-up') || text.includes('komik')) return 'comedy';
  if (text.includes('music') || text.includes('hudba') || text.includes('concert')) return 'music';

  return 'other';
}

// Get event type label
function getEventTypeLabel(type: EventType, t: (key: string) => string): string {
  const labels: Record<EventType, string> = {
    all: t('events.filters.all'),
    quiz: t('events.filters.quiz'),
    tournament: t('events.filters.tournament'),
    rpg: t('events.filters.rpg'),
    comedy: t('events.filters.comedy'),
    music: t('events.filters.music'),
    other: t('events.filters.other'),
  };
  return labels[type];
}

// Get event type color
function getEventTypeColor(type: EventType): string {
  const colors: Record<EventType, string> = {
    all: 'bg-primary/10 text-primary border-primary/20',
    quiz: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    tournament: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    rpg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    comedy: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    music: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    other: 'bg-muted text-muted-foreground border-border',
  };
  return colors[type];
}

// Get event type icon
function getEventTypeIcon(type: EventType) {
  const icons: Record<EventType, any> = {
    all: Calendar,
    quiz: Trophy,
    tournament: Dices,
    rpg: Scroll,
    comedy: Users,
    music: Users,
    other: Calendar,
  };
  const Icon = icons[type];
  return <Icon className="h-4 w-4" />;
}

// Get event status
function getEventStatus(startTime: string): 'today' | 'upcoming' | 'past' {
  const eventDate = new Date(startTime);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

  if (eventDay.getTime() === today.getTime()) return 'today';
  if (eventDate > now) return 'upcoming';
  return 'past';
}

// Countdown timer hook
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return null;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default function EventsClient({ events = [], error }: EventsClientProps) {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<EventType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showPastEvents, setShowPastEvents] = useState(false);

  // Filter and sort events
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    const upcoming: FacebookEvent[] = [];
    const past: FacebookEvent[] = [];

    events.forEach(event => {
      if (new Date(event.start_time) > now) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

  // Apply filters
  const filteredEvents = useMemo(() => {
    let filtered = showPastEvents ? pastEvents : upcomingEvents;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(event => detectEventType(event) === selectedType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(query) ||
        (event.description || '').toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [upcomingEvents, pastEvents, selectedType, searchQuery, showPastEvents]);

  // Get next event for countdown
  const nextEvent = upcomingEvents[0];

  const eventTypes: EventType[] = ['all', 'quiz', 'tournament', 'rpg', 'comedy', 'music', 'other'];

  return (
    <div className="container mx-auto max-w-6xl py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-8 w-24 h-24 opacity-[0.03] pointer-events-none" style={{ willChange: 'opacity' }}>
        <Calendar className="h-full w-full text-primary" />
      </div>
      <div className="absolute top-1/3 right-12 w-20 h-20 opacity-[0.03] pointer-events-none" style={{ willChange: 'opacity' }}>
        <Trophy className="h-full w-full text-primary" />
      </div>
      <div className="absolute bottom-1/4 left-16 w-20 h-20 opacity-[0.03] pointer-events-none" style={{ willChange: 'opacity' }}>
        <Dices className="h-full w-full text-primary" />
      </div>
      <div className="absolute bottom-32 right-8 w-24 h-24 opacity-[0.03] pointer-events-none" style={{ willChange: 'opacity' }}>
        <Swords className="h-full w-full text-primary" />
      </div>

      {/* Header */}
      <header className="text-center mb-16 relative z-10">
        <h1 className="font-headline font-bold text-5xl md:text-6xl text-primary mb-6">{t('nav.events')}</h1>
        <p className="mt-4 text-xl md:text-2xl text-muted-foreground leading-relaxed">{t('events.subtitle')}</p>

        {/* Decorative divider */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-primary"></div>
          <Trophy className="h-6 w-6 text-primary" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-primary"></div>
        </div>

        <a
          href={`https://www.facebook.com/${process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || 'dungeonpub'}/events`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left text-base md:text-lg text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <Facebook className="h-5 w-5 md:h-6 md:w-6" />
          <span>{t('events.fb_link_text')}</span>
        </a>
      </header>

      {/* Countdown Timer for Next Event */}
      {nextEvent && !error && (
        <CountdownCard event={nextEvent} t={t} />
      )}

      {/* Filters and Search */}
      <div className="mb-10 space-y-6 relative z-10">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('events.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 md:h-14 text-base md:text-lg bg-card/80 backdrop-blur-sm border-border/50 focus:border-primary/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="h-5 w-5 text-muted-foreground" />
          {eventTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType(type)}
              className={`transition-all duration-300 ${
                selectedType === type
                  ? 'shadow-lg shadow-primary/30'
                  : 'hover:border-primary/50'
              }`}
            >
              <span className="flex items-center gap-2">
                {getEventTypeIcon(type)}
                {getEventTypeLabel(type, t)}
              </span>
            </Button>
          ))}
        </div>

        {/* View Mode & Past Events Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant={showPastEvents ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowPastEvents(!showPastEvents)}
          >
            {showPastEvents ? t('events.showUpcoming') : t('events.showPast')}
          </Button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6 relative z-10">
        {error && (
          <Card className="text-center bg-card/80 backdrop-blur-sm border-2 border-destructive/30 p-12 transition-all duration-500 hover:shadow-2xl hover:border-destructive/50">
            <Shield className="h-16 w-16 text-destructive/60 mx-auto mb-6" />
            <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-4">
              Events Temporarily Unavailable
            </h3>
            <p className="max-w-md mx-auto text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              We're having trouble loading events from Facebook right now. Please check our{' '}
              <a
                href={`https://www.facebook.com/${process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || 'dungeonpub'}/events`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Facebook page
              </a>
              {' '}directly for the latest events.
            </p>
            <details className="text-left max-w-md mx-auto mt-6">
              <summary className="cursor-pointer text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors">
                Technical details
              </summary>
              <p className="mt-2 text-xs md:text-sm font-mono bg-destructive/10 p-3 rounded-md text-destructive">
                {error}
              </p>
            </details>
          </Card>
        )}

        {!error && filteredEvents.length === 0 && (
          <Card className="text-center bg-gradient-to-br from-card via-card/95 to-primary/5 backdrop-blur-sm p-16 border-2 border-dashed border-border/50 transition-all duration-500 hover:shadow-2xl hover:border-primary/30">
            <Calendar className="h-20 w-20 text-primary/30 mx-auto mb-6" />
            <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary/90 mb-4">
              {showPastEvents ? t('events.noPastEvents') : t('events.noUpcomingEvents')}
            </h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
              {showPastEvents
                ? t('events.noPastEventsDesc')
                : t('events.noUpcomingEventsDesc')}
            </p>
            {!showPastEvents && (
              <Button asChild size="lg" className="mt-4">
                <a
                  href={`https://www.facebook.com/${process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || 'dungeonpub'}/events`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5 mr-2" />
                  {t('events.checkFacebook')}
                </a>
              </Button>
            )}
          </Card>
        )}

        {!error && filteredEvents.length > 0 && (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} t={t} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Countdown Card Component
function CountdownCard({ event, t }: { event: FacebookEvent; t: (key: string) => string }) {
  const timeLeft = useCountdown(event.start_time);
  const eventType = detectEventType(event);

  if (!timeLeft) return null;

  return (
    <Card className="mb-10 bg-gradient-to-br from-primary/10 via-card to-card border-2 border-primary/30 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="p-4 bg-primary/20 rounded-full">
              <Clock className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm md:text-base text-muted-foreground mb-2">{t('events.nextEvent')}</p>
            <h3 className="font-headline text-xl md:text-2xl font-bold text-primary mb-3">{event.name}</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{timeLeft.days}</div>
                <div className="text-xs text-muted-foreground">{t('events.days')}</div>
              </div>
              <div className="text-2xl text-muted-foreground">:</div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{timeLeft.hours}</div>
                <div className="text-xs text-muted-foreground">{t('events.hours')}</div>
              </div>
              <div className="text-2xl text-muted-foreground">:</div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{timeLeft.minutes}</div>
                <div className="text-xs text-muted-foreground">{t('events.minutes')}</div>
              </div>
              <div className="text-2xl text-muted-foreground">:</div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{timeLeft.seconds}</div>
                <div className="text-xs text-muted-foreground">{t('events.seconds')}</div>
              </div>
            </div>
          </div>
          <Badge className={`${getEventTypeColor(eventType)} px-4 py-2 text-sm font-semibold`}>
            {getEventTypeIcon(eventType)}
            <span className="ml-2">{getEventTypeLabel(eventType, t)}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Event Card Component
function EventCard({ event, index, t, viewMode }: { event: FacebookEvent; index: number; t: (key: string) => string; viewMode: ViewMode }) {
  const eventType = detectEventType(event);
  const status = getEventStatus(event.start_time);

  return (
    <Card
      className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
    >
      <div className={`flex ${viewMode === 'grid' ? 'flex-col' : 'flex-col md:flex-row'}`}>
        {event.cover && (
          <div className={`relative ${viewMode === 'grid' ? 'h-48' : 'md:w-1/3 h-64 md:h-auto'} overflow-hidden group`}>
            <Image
              src={event.cover.source}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Status badge overlay */}
            {status === 'today' && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                {t('events.today')}
              </div>
            )}
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          {/* Event type badge and date */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <Badge className={`${getEventTypeColor(eventType)} border px-3 py-1 text-xs font-semibold`}>
              {getEventTypeIcon(eventType)}
              <span className="ml-2">{getEventTypeLabel(eventType, t)}</span>
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="font-semibold">
                {new Date(event.start_time).toLocaleString('sk-SK', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              </span>
            </div>
          </div>

          {/* Event title */}
          <h2 className="font-headline text-xl md:text-2xl font-bold text-primary mb-3 leading-tight">
            {event.name}
          </h2>

          {/* Event description */}
          {event.description && (
            <p className="text-foreground/80 mb-4 flex-grow line-clamp-3 leading-relaxed">
              {event.description}
            </p>
          )}

          {/* Visual separator */}
          <div className="my-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
            <Scroll className="h-4 w-4 text-primary/40" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent"></div>
          </div>

          {/* Action button */}
          <Link
            href={`https://www.facebook.com/events/${event.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline self-start mt-auto group"
          >
            <span>View on Facebook</span>
            <Facebook className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
