'use client';

import { type Event } from '@/lib/contentful';
import Image from 'next/image';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Ticket, ArrowLeft, ZoomIn, MapPin, Tag, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

// Rich Text Renderer Options
const richTextOptions: Options = {
    renderNode: {
        [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-2xl md:text-3xl font-bold font-headline mt-8 mb-4 text-primary">{children}</h2>,
        [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-xl md:text-2xl font-bold font-headline mt-6 mb-3 text-primary/90">{children}</h3>,
        [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-6 leading-relaxed text-lg">{children}</p>,
        [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc list-inside mb-6 pl-4 space-y-2 text-lg">{children}</ul>,
        [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal list-inside mb-6 pl-4 space-y-2 text-lg">{children}</ol>,
        [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
        [INLINES.HYPERLINK]: (node, children) => <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80 font-semibold transition-colors">{children}</a>,
        [BLOCKS.QUOTE]: (node, children) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">{children}</blockquote>,
    }
};


const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeInOut" }
};

export default function EventDetailClientPage({ event }: { event: Event }) {
    const [isImageOpen, setIsImageOpen] = useState(false);
    const { fields } = event;
    const imageUrl = fields.featuredImage?.[0]?.fields?.file?.url;
    const safeImageUrl = imageUrl ? `https:${imageUrl}` : '/placeholder.png';

    const [startDateString, setStartDateString] = useState("...");
    const [startTimeString, setStartTimeString] = useState("...");
    const [endDateString, setEndDateString] = useState<string | null>(null);
    const [endTimeString, setEndTimeString] = useState<string | null>(null);

    useEffect(() => {
        const startDate = new Date(fields.startDate);
        setStartDateString(format(startDate, 'EEEE, d. MMMM yyyy', { locale: sk }));
        setStartTimeString(format(startDate, 'HH:mm'));

        if (fields.endDate) {
            const endDate = new Date(fields.endDate);
            setEndDateString(`do ${format(endDate, 'd. MMMM yyyy', { locale: sk })}`);
            setEndTimeString(`koniec o ${format(endDate, 'HH:mm')}`);
        }
    }, [fields.startDate, fields.endDate]);

    const renderDescription = (description: string | Document) => {
        if (typeof description === 'object' && description.nodeType === BLOCKS.DOCUMENT) {
            return documentToReactComponents(description, richTextOptions);
        }
        if (typeof description === 'string') {
            return <div className="whitespace-pre-wrap">{description}</div>;
        }
        return <p className="text-muted-foreground">Pre toto podujatie nie je k dispozícii žiadny ďalší popis.</p>;
    };

    return (
        <>
            <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
                <motion.div {...fadeIn}>
                    <Button asChild variant="ghost" className="mb-8 text-lg">
                        <Link href="/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                            Späť na všetky podujatia
                        </Link>
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    <motion.div className="lg:col-span-2 space-y-12" initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.1 } } }}>
                        
                        <motion.div variants={fadeIn}>
                            <Card className="overflow-hidden border-border/40 bg-card/50">
                                <button 
                                    onClick={() => setIsImageOpen(true)}
                                    className="block w-full group relative aspect-video focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-t-lg bg-black/30"
                                >
                                    <Image
                                        src={safeImageUrl}
                                        alt={fields.title}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        className="transition-transform duration-500 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ZoomIn className="h-16 w-16 text-white/90" />
                                    </div>
                                </button>
                                <CardContent className="p-8 md:p-10">
                                    <header>
                                        <h1 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl text-primary mb-4">{fields.title}</h1>
                                        <p className="text-xl md:text-2xl text-muted-foreground mb-6">{fields.shortDescription}</p>
                                        {fields.category && fields.category.length > 0 && (
                                            <div className="flex flex-wrap gap-3">
                                                {fields.category.map(cat => 
                                                    <Badge 
                                                        key={cat} 
                                                        variant="default"
                                                        className="cursor-pointer transition-all shadow-lg hover:shadow-xl hover:brightness-110 transform hover:-translate-y-px"
                                                    >
                                                        {cat}
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </header>
                                </CardContent>
                            </Card>
                        </motion.div>
                        
                        <motion.div variants={fadeIn}>
                            <Card className="border-border/40 bg-card/50">
                                <CardHeader className="p-8 md:p-10">
                                    <CardTitle className="font-headline text-3xl md:text-4xl text-primary/95">Popis Podujatia</CardTitle>
                                </CardHeader>
                                <CardContent className="prose prose-invert max-w-none text-foreground/90 px-8 md:px-10 pb-8 md:pb-10">
                                    {renderDescription(fields.fullDescription)}
                                </CardContent>
                            </Card>
                        </motion.div>

                    </motion.div>

                    <aside className="lg:col-span-1 space-y-12 lg:sticky lg:top-28">
                        <motion.div variants={fadeIn}>
                            <Card className="p-8 border-border/40 bg-card/50">
                                <h3 className="font-headline text-2xl font-bold text-primary/90 mb-8">Detail podujatia</h3>
                                <div className="space-y-8">
                                    <InfoItem icon={Calendar} label="Dátum">
                                        <p className="font-semibold">{startDateString}</p>
                                        {fields.endDate && endDateString && <p className="text-sm text-muted-foreground">{endDateString}</p>}
                                    </InfoItem>

                                    <Separator />

                                    <InfoItem icon={Clock} label="Čas">
                                        <p className="font-semibold">{startTimeString}</p>
                                        {fields.endDate && endTimeString && <p className="text-sm text-muted-foreground">{endTimeString}</p>}
                                    </InfoItem>
                                    
                                    {fields.entryFee && (
                                        <>
                                            <Separator />
                                            <InfoItem icon={Tag} label="Vstupné">
                                                <p className="font-semibold">{fields.entryFee}</p>
                                            </InfoItem>
                                        </>
                                    )}

                                    {fields.registrationLink && (
                                        <>
                                            <Separator />
                                            <InfoItem icon={Ticket} label="Vstupenky">
                                                <a href={fields.registrationLink} target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-primary transition-colors">Registrácia / Vstupenky</a>
                                            </InfoItem>
                                        </>
                                    )}
                                    
                                    <Separator />
                                    
                                    <InfoItem icon={MapPin} label="Miesto">
                                         <p className="font-semibold">Dungeon Pub</p>
                                         <p className="text-sm text-muted-foreground">Štefánikova 869/14, Bratislava</p>
                                         {fields.room && (
                                            <p className="text-sm text-muted-foreground mt-1">Miestnosť: {fields.room}</p>
                                         )}
                                    </InfoItem>

                                    {fields.status && fields.status.length > 0 && (
                                        <>
                                            <Separator />
                                            <InfoItem icon={Activity} label="Status">
                                                <div className="flex flex-wrap gap-3">
                                                    {fields.status.map(s => (
                                                        <Badge key={s} variant="secondary" className="font-mono shadow-md">{s}</Badge>
                                                    ))}
                                                </div>
                                            </InfoItem>
                                        </>
                                    )}
                                </div>
                                {fields.registrationLink && (
                                    <Button asChild size="lg" className="w-full mt-10 font-headline text-xl">
                                        <a href={fields.registrationLink} target="_blank" rel="noopener noreferrer">Zaregistrujte sa</a>
                                    </Button>
                                )}
                            </Card>
                        </motion.div>
                    </aside>
                </div>
            </div>
            
            <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
                <DialogContent
                    onClick={() => setIsImageOpen(false)}
                    className="max-w-[95vw] md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] w-auto h-auto bg-transparent border-none p-0 shadow-none flex items-center justify-center"
                >
                     <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        onClick={(e) => e.stopPropagation()} 
                        className="relative flex items-center justify-center"
                     >
                        <DialogTitle className="sr-only">{fields.title}</DialogTitle>
                        <DialogDescription className="sr-only">Enlarged view of event image for: {fields.title}</DialogDescription>
                        
                        <Image
                            src={safeImageUrl}
                            alt={fields.title}
                            width={1920}
                            height={1080}
                            className="object-contain max-w-[85vw] md:max-w-[80vw] max-h-[90vh] rounded-lg shadow-2xl"
                        />
                    </motion.div>
                </DialogContent>
            </Dialog>
        </>
    );
}

function InfoItem({ icon: Icon, label, children }: { icon: React.ElementType, label: string, children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-5">
            <Icon className="h-7 w-7 text-primary mt-1 shrink-0"/>
            <div>
                <p className="text-md font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
                <div className="text-foreground/90 text-lg mt-1">{children}</div>
            </div>
        </div>
    );
}
