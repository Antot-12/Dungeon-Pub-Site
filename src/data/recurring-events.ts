/**
 * Recurring Events Schedule for Dungeon Pub
 * Based on typical monthly programs
 */

export type RecurringEventType = 'quiz' | 'tournament' | 'rpg' | 'comedy' | 'music' | 'boardgame' | 'other';

export interface RecurringEvent {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  type: RecurringEventType;
  dayOfWeek?: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  time: string;
  imageUrl?: string;
}

export const recurringEvents: RecurringEvent[] = [
  // WEEKLY EVENTS
  {
    id: 'quiz-general-wed',
    name: 'Všeobecný Kvíz',
    nameEn: 'General Knowledge Quiz',
    description: 'Pravidelný všeobecný kvíz každú stredu. Otestujte svoje vedomosti a súťažte o ceny!',
    descriptionEn: 'Regular general knowledge quiz every Wednesday. Test your knowledge and compete for prizes!',
    type: 'quiz',
    dayOfWeek: 3, // Wednesday
    frequency: 'weekly',
    time: '20:00',
  },
  {
    id: 'dnd-sessions-mon',
    name: 'Dungeons & Dragons Sessions: Na Ceste Hrdinov',
    nameEn: 'Dungeons & Dragons Sessions: On the Path of Heroes',
    description: 'Pravidelné D&D herné sedenia každý pondelok. Pridajte sa k našim dobrodružstvám!',
    descriptionEn: 'Regular D&D gaming sessions every Monday. Join our adventures!',
    type: 'rpg',
    dayOfWeek: 1, // Monday
    frequency: 'biweekly',
    time: '18:00',
  },

  // MONTHLY EVENTS - QUIZZES
  {
    id: 'quiz-fantasy',
    name: 'Fantasy Vedomostný Kvíz',
    nameEn: 'Fantasy Knowledge Quiz',
    description: 'Špeciálny kvíz pre fanúšikov fantasy. Otestujte svoje znalosti zo sveta fantasy!',
    descriptionEn: 'Special quiz for fantasy fans. Test your knowledge of the fantasy world!',
    type: 'quiz',
    dayOfWeek: 1, // Monday
    frequency: 'monthly',
    time: '19:30',
  },
  {
    id: 'quiz-movies',
    name: 'Filmovo-seriálový Kvíz',
    nameEn: 'Movies & TV Series Quiz',
    description: 'Kvíz zameraný na filmy a seriály. Ukážte svoje filmové znalosti!',
    descriptionEn: 'Quiz focused on movies and TV series. Show your movie knowledge!',
    type: 'quiz',
    dayOfWeek: 2, // Tuesday
    frequency: 'monthly',
    time: '20:00',
  },
  {
    id: 'quiz-anime',
    name: 'ANIME Kvíz',
    nameEn: 'ANIME Quiz',
    description: 'Kvíz pre anime fanúšikov. Otestujte svoje znalosti japonskej animácie!',
    descriptionEn: 'Quiz for anime fans. Test your knowledge of Japanese animation!',
    type: 'quiz',
    dayOfWeek: 2, // Tuesday
    frequency: 'monthly',
    time: '18:30',
  },

  // TOURNAMENTS
  {
    id: 'beerpong',
    name: 'Beerpong Tournament',
    nameEn: 'Beerpong Tournament',
    description: 'Mesačný turnaj v beer pongu! Príďte ukázať svoje zručnosti.',
    descriptionEn: 'Monthly beer pong tournament! Come show your skills.',
    type: 'tournament',
    dayOfWeek: 6, // Saturday
    frequency: 'monthly',
    time: '20:00',
  },

  // BOARD GAMES
  {
    id: 'nero-games',
    name: 'NERO GAMES Boardgame Night',
    nameEn: 'NERO GAMES Boardgame Night',
    description: 'Pravidelný večer deskových hier s NERO GAMES. Vyskúšajte nové hry!',
    descriptionEn: 'Regular board game night with NERO GAMES. Try new games!',
    type: 'boardgame',
    dayOfWeek: 4, // Thursday
    frequency: 'monthly',
    time: '19:00',
  },

  // COMEDY
  {
    id: 'comedy-dungeon',
    name: 'COMEDY Dungeon Stand-Up',
    nameEn: 'COMEDY Dungeon Stand-Up',
    description: 'Pravidelný stand-up comedy večer. Príďte sa zasmiať!',
    descriptionEn: 'Regular stand-up comedy night. Come have a laugh!',
    type: 'comedy',
    dayOfWeek: 2, // Tuesday
    frequency: 'monthly',
    time: '19:00',
  },

  // MUSIC
  {
    id: 'irish-jam',
    name: 'Irish Music Jam Session',
    nameEn: 'Irish Music Jam Session',
    description: 'Pravidelná írska jam session. Živá hudba a skvelá atmosféra!',
    descriptionEn: 'Regular Irish jam session. Live music and great atmosphere!',
    type: 'music',
    dayOfWeek: 4, // Thursday
    frequency: 'monthly',
    time: '19:30',
  },
  {
    id: 'just-dance',
    name: 'Just Dance Night',
    nameEn: 'Just Dance Night',
    description: 'Tanečná noc s hrou Just Dance! Zatancujte si na obľúbené piesne.',
    descriptionEn: 'Dance night with Just Dance game! Dance to your favorite songs.',
    type: 'music',
    dayOfWeek: 6, // Saturday
    frequency: 'monthly',
    time: '20:00',
  },

  // SPECIAL EVENTS
  {
    id: 'special-lecture',
    name: 'Prednáška o vikingskej mytológii',
    nameEn: 'Lecture on Viking Mythology',
    description: 'Vzdelávacie podujatie o vikingskej mytológii a histórii.',
    descriptionEn: 'Educational event about Viking mythology and history.',
    type: 'other',
    frequency: 'monthly',
    time: '16:30',
  },
  {
    id: 'special-friday13',
    name: 'Friday the 13th',
    nameEn: 'Friday the 13th',
    description: 'Špeciálne podujatie pri príležitosti piatku 13-teho.',
    descriptionEn: 'Special event celebrating Friday the 13th.',
    type: 'other',
    frequency: 'monthly',
    time: '19:00',
  }
];

export function getUpcomingRecurringEvents(days: number = 60): Array<RecurringEvent & { date: Date }> {
  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(now.getDate() + days);

  const upcomingEvents: Array<RecurringEvent & { date: Date }> = [];

  recurringEvents.forEach(event => {
    if (event.dayOfWeek !== undefined) {
      let currentDate = new Date(now);
      currentDate.setHours(0, 0, 0, 0);

      while (currentDate <= futureDate) {
        if (currentDate.getDay() === event.dayOfWeek) {
          const eventDateTime = new Date(currentDate);
          const [hours, minutes] = event.time.split(':');
          eventDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

          if (eventDateTime > now) {
            upcomingEvents.push({
              ...event,
              date: eventDateTime
            });
          }

          if (event.frequency === 'weekly') {
            currentDate.setDate(currentDate.getDate() + 7);
          } else if (event.frequency === 'biweekly') {
            currentDate.setDate(currentDate.getDate() + 14);
          } else {
            currentDate.setMonth(currentDate.getMonth() + 1);
          }
        } else {
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    } else {
      const eventDate = new Date(now);
      eventDate.setDate(15);
      const [hours, minutes] = event.time.split(':');
      eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      if (eventDate > now) {
        upcomingEvents.push({
          ...event,
          date: eventDate
        });
      }
    }
  });

  return upcomingEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getRecurringEventById(id: string): RecurringEvent | undefined {
  return recurringEvents.find(event => event.id === id);
}

export function getRecurringEventsByType(type: RecurringEventType): RecurringEvent[] {
  return recurringEvents.filter(event => event.type === type);
}
