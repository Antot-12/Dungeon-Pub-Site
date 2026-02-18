'use client';

import { type Event } from '@/lib/contentful';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function EventCard({ event }: { event: Event }) {
    const { fields } = event;
    const imageUrl = fields.featuredImage?.[0]?.fields?.file?.url;
    const safeImageUrl = imageUrl ? `https:${imageUrl}` : '/placeholder.png';
    const [formattedDate, setFormattedDate] = useState('');
    const [formattedTime, setFormattedTime] = useState('');

    useEffect(() => {
        const date = new Date(fields.startDate);
        setFormattedDate(format(date, 'd. MMMM yyyy', { locale: sk }));
        setFormattedTime(format(date, 'HH:mm'));
    }, [fields.startDate]);


  return (
    <Link href={`/events/${fields.slug}`}>
        <Card className="h-full flex flex-col overflow-hidden bg-card/80 border-border/50 transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 group">
            <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                    src={safeImageUrl}
                    alt={fields.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <CardContent className="p-6 flex-grow flex flex-col">
                <h4 className="font-headline font-bold text-xl text-primary/90 mb-2 leading-tight">{fields.title}</h4>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">{fields.shortDescription}</p>
                <div className="flex flex-col gap-2 text-foreground/80 mt-auto text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary"/>
                        <span className="font-medium">{formattedDate || '...'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary"/>
                        <span>o {formattedTime || '...'}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    </Link>
  );
}
