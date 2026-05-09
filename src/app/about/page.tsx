'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Facebook, Instagram, Users, Calendar, Gamepad2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

export default function AboutPage() {
    const { t } = useLanguage();
    const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-pub');

    return (
        <div className="container mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
                <h1 className="font-headline font-bold text-5xl md:text-6xl text-primary">{t('about.title')}</h1>
                <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">{t('about.subtitle')}</p>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="lg:col-span-2 space-y-8">

                    <Card className="border-border/50 bg-card/50 transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4 text-primary font-headline text-2xl md:text-3xl">
                                <Users className="h-8 w-8" />
                                {t('about.story.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 text-foreground/90 leading-relaxed">
                            <p className="text-lg md:text-xl text-primary/90 border-l-4 border-primary pl-4 italic">
                                {t('about.p1')}
                            </p>
                            <p className="text-lg">
                                {t('about.p2')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4 text-primary font-headline text-2xl md:text-3xl">
                                <Calendar className="h-8 w-8" />
                                {t('about.events.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
                             <p className="text-lg">
                                {t('about.p3')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4 text-primary font-headline text-2xl md:text-3xl">
                                <Gamepad2 className="h-8 w-8" />
                                {t('about.games.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
                            <p className="text-lg">
                                {t('about.p4')}
                            </p>
                            <p className="text-lg">
                                {t('about.p5')}
                            </p>
                        </CardContent>
                    </Card>

                </div>
                
                <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-28">
                     {aboutImage && (
                        <div className="overflow-hidden rounded-lg shadow-2xl">
                            <Image
                                src={aboutImage.imageUrl}
                                alt={aboutImage.description}
                                width={600}
                                height={400}
                                priority
                                data-ai-hint={aboutImage.imageHint}
                                className="object-cover w-full h-auto transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                    )}

                    <Card className="text-center p-6 border-border/50 bg-card/50 transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
                        <h2 className="font-headline font-bold text-2xl text-primary">{t('about.social.title')}</h2>
                        <p className="mt-2 text-muted-foreground">{t('about.social.subtitle')}</p>
                        <div className="mt-6 flex justify-center gap-6">
                            <Link href="https://www.facebook.com/dungeonpub/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
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
                                  <Facebook className="h-8 w-8 text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110" />
                                </motion.div>
                            </Link>
                            <Link href="https://www.instagram.com/dungeon_pub" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
                                  <Instagram className="h-8 w-8 text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110" />
                                </motion.div>
                            </Link>
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
