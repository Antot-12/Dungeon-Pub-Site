'use client';

import { Facebook, Calendar, Trophy, Dices, Swords, Clock, MapPin, Users, Search, Filter, Grid3x3, Scroll, Shield, X } from 'lucide-react';
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
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
  start_time: string;
  cover?: {
    source: string;
  };
  type?: 'quiz' | 'tournament' | 'rpg' | 'comedy' | 'music' | 'boardgame' | 'other';
  isRecurring?: boolean;
};

type EventType = 'all' | 'quiz' | 'tournament' | 'rpg' | 'comedy' | 'music' | 'boardgame' | 'other';

type ViewMode = 'list' | 'grid';

interface EventsClientProps {
  events?: FacebookEvent[];
  error?: string | null;
  hasRecurringEvents?: boolean;
}

// Helper function to detect event type from name/description
function detectEventType(event: FacebookEvent): EventType {
  // If type is already set (from recurring events), use it
  if (event.type && event.type !== 'other') {
    return event.type as EventType;
  }

  const text = `${event.name} ${event.description || ''}`.toLowerCase();

  // Quiz events - check first as they're most common
  if (
    text.includes('kvíz') ||
    text.includes('quiz') ||
    text.includes('vedomostný') ||
    text.includes('vedomostny') ||
    text.includes('anime') && text.includes('vol')
  ) return 'quiz';

  // Tournament events
  if (
    text.includes('turnaj') ||
    text.includes('tournament') ||
    text.includes('beerpong') ||
    text.includes('beer pong')
  ) return 'tournament';

  // Board game events
  if (
    text.includes('boardgame') ||
    text.includes('board game') ||
    text.includes('doskové hry') ||
    text.includes('deskove hry') ||
    text.includes('nero games') ||
    text.includes('level majstrov')
  ) return 'boardgame';

  // RPG and D&D events
  if (
    text.includes('rpg') ||
    text.includes('d&d') ||
    text.includes('dnd') ||
    text.includes('dungeons') ||
    text.includes('dragons') ||
    text.includes('na ceste hrdinov') ||
    text.includes('sessions')
  ) return 'rpg';

  // Comedy events
  if (
    text.includes('comedy') ||
    text.includes('stand-up') ||
    text.includes('komik') ||
    text.includes('komedia')
  ) return 'comedy';

  // Music events
  if (
    text.includes('music') ||
    text.includes('hudba') ||
    text.includes('koncert') ||
    text.includes('concert') ||
    text.includes('jam session') ||
    text.includes('just dance') ||
    text.includes('pexo') ||
    text.includes('irish')
  ) return 'music';

  return 'other';
}

// Get event type label
function getEventTypeLabel(type: EventType, t: (key: string) => string): string {
  const labels: Record<EventType, string> = {
    all: t('events.filters.all'),
    quiz: t('events.filters.quiz'),
    tournament: t('events.filters.tournament'),
    rpg: t('events.filters.rpg'),
    boardgame: t('events.filters.boardgame'),
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
    boardgame: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
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
    boardgame: Swords,
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

export default function EventsClient({ events = [], error, hasRecurringEvents = false }: EventsClientProps) {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<EventType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
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

  const eventTypes: EventType[] = ['all', 'quiz', 'tournament', 'rpg', 'boardgame', 'comedy', 'music', 'other'];

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
      <header className="text-center mb-6 relative z-10">
        <h1 className="font-headline font-bold text-6xl md:text-7xl text-primary">{t('nav.events')}</h1>
      </header>

      {/* Countdown Timer for Next Event */}
      {nextEvent && !error && (
        <CountdownCard
          event={nextEvent}
          t={t}
          onTagClick={(type) => {
            setSelectedType(type);
          }}
        />
      )}

      {/* Filters and Search */}
      <div className="mb-10 space-y-6 relative z-10">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('events.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 pr-14 h-14 md:h-16 text-lg md:text-xl bg-card/80 backdrop-blur-sm border-border/50 focus:border-primary/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="h-6 w-6 text-muted-foreground" />
          {eventTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? 'default' : 'outline'}
              size="lg"
              onClick={() => setSelectedType(type)}
              className={`transition-all duration-300 text-base ${
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
        <div className="flex flex-wrap items-center justify-end gap-4">
          <Button
            variant={showPastEvents ? 'default' : 'outline'}
            size="lg"
            onClick={() => setShowPastEvents(!showPastEvents)}
            className="text-base"
          >
            {showPastEvents ? t('events.showUpcoming') : t('events.showPast')}
          </Button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6 relative z-10">
        {error && (
          <Card className="text-center bg-card/80 backdrop-blur-sm border-2 border-destructive/30 p-12 transition-all duration-500 hover:shadow-2xl hover:border-destructive/50">
            <Shield className="h-20 w-20 text-destructive/60 mx-auto mb-6" />
            <h3 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4">
              Events Temporarily Unavailable
            </h3>
            <p className="max-w-md mx-auto text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
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
              <summary className="cursor-pointer text-base md:text-lg text-muted-foreground hover:text-foreground transition-colors">
                Technical details
              </summary>
              <p className="mt-2 text-sm md:text-base font-mono bg-destructive/10 p-3 rounded-md text-destructive">
                {error}
              </p>
            </details>
          </Card>
        )}

        {!error && filteredEvents.length === 0 && (
          <Card className="text-center bg-gradient-to-br from-card via-card/95 to-primary/5 backdrop-blur-sm p-12 md:p-16 border-2 border-dashed border-border/50 transition-all duration-500 hover:shadow-2xl hover:border-primary/30">
            <Calendar className="h-24 w-24 text-primary/30 mx-auto mb-6 animate-pulse" />
            <h3 className="font-headline text-3xl md:text-4xl font-bold text-primary/90 mb-4">
              {showPastEvents ? t('events.noPastEvents') : t('events.noUpcomingEvents')}
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              {showPastEvents
                ? t('events.noPastEventsDesc')
                : t('events.noUpcomingEventsDesc')}
            </p>
            {!showPastEvents && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="text-lg md:text-xl px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                    <a
                      href="https://www.facebook.com/dungeonpub/events"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-6 w-6 mr-2" />
                      {t('events.viewOnFacebook')}
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg md:text-xl px-8 py-6">
                    <a
                      href="https://www.facebook.com/dungeonpub"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-6 w-6 mr-2" />
                      {t('events.followUs')}
                    </a>
                  </Button>
                </div>
                <p className="text-base text-muted-foreground mt-4">
                  {t('events.monthlyProgram')}
                </p>
              </div>
            )}
          </Card>
        )}

        {!error && filteredEvents.length > 0 && (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                t={t}
                viewMode={viewMode}
                onTagClick={(type) => {
                  setSelectedType(type);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Countdown Card Component
function CountdownCard({ event, t, onTagClick }: {
  event: FacebookEvent;
  t: (key: string) => string;
  onTagClick: (type: EventType) => void;
}) {
  const timeLeft = useCountdown(event.start_time);
  const eventType = detectEventType(event);

  if (!timeLeft) return null;

  return (
    <Card className="mb-8 bg-gradient-to-br from-primary/10 via-card to-card border-2 border-primary/30 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
      <CardContent className="p-3 md:p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3">
          <div className="flex items-center gap-2 md:gap-3 flex-1">
            <div className="flex-shrink-0">
              <div className="p-1.5 bg-primary/20 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm text-muted-foreground mb-0">{t('events.nextEvent')}</p>
              <h3 className="font-headline text-base md:text-lg font-bold text-primary mb-1">{event.name}</h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-1.5 md:gap-2">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-primary leading-none">{timeLeft.days}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{t('events.days')}</div>
                </div>
                <div className="text-xl md:text-2xl text-muted-foreground leading-none self-start">:</div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-primary leading-none">{timeLeft.hours}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{t('events.hours')}</div>
                </div>
                <div className="text-xl md:text-2xl text-muted-foreground leading-none self-start">:</div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-primary leading-none">{timeLeft.minutes}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{t('events.minutes')}</div>
                </div>
                <div className="text-xl md:text-2xl text-muted-foreground leading-none self-start">:</div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-primary leading-none">{timeLeft.seconds}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{t('events.seconds')}</div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => onTagClick(eventType)}
            className={`${getEventTypeColor(eventType)} px-2.5 py-1 text-xs md:text-sm font-semibold rounded-full inline-flex items-center gap-1.5 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer flex-shrink-0`}
            title={`Filter by ${getEventTypeLabel(eventType, t)}`}
          >
            {getEventTypeIcon(eventType)}
            <span>{getEventTypeLabel(eventType, t)}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

// Event Card Component
function EventCard({ event, index, t, viewMode, onTagClick }: {
  event: FacebookEvent;
  index: number;
  t: (key: string) => string;
  viewMode: ViewMode;
  onTagClick: (type: EventType) => void;
}) {
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
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                {t('events.today')}
              </div>
            )}
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          {/* Event type badge and date */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div className="flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onTagClick(eventType);
                }}
                className={`${getEventTypeColor(eventType)} border px-3 py-1 text-sm font-semibold rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer w-fit`}
                title={`Filter by ${getEventTypeLabel(eventType, t)}`}
              >
                {getEventTypeIcon(eventType)}
                <span>{getEventTypeLabel(eventType, t)}</span>
              </button>
            </div>
            <div className="flex flex-col gap-1.5 text-right">
              <div className="flex items-center gap-2 text-base text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">
                  {new Date(event.start_time).toLocaleString('sk-SK', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-lg text-primary font-bold">
                <Clock className="h-5 w-5" />
                <span>
                  {new Date(event.start_time).toLocaleString('sk-SK', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Event title */}
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight">
            {event.name}
          </h2>

          {/* Event description */}
          {event.description && (
            <p className="text-base text-foreground/80 mb-4 flex-grow line-clamp-4 leading-relaxed">
              {event.description}
            </p>
          )}

          {/* Event info footer */}
          <div className="mt-auto pt-4 border-t border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Dungeon Pub, Bratislava</span>
              </div>
              <Link
                href={`https://www.facebook.com/events/${event.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base text-primary font-bold hover:underline group"
              >
                <span>Viac info</span>
                <Facebook className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
