'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Facebook, Instagram, Users, Calendar, Gamepad2, Scroll, Shield, Swords } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

export default function AboutPage() {
    const { t } = useLanguage();
    const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-pub');

    return (
        <div className="container mx-auto max-w-6xl py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-20 left-8 w-24 h-24 opacity-[0.03] pointer-events-none" style={{ willChange: 'opacity' }}>
                <Scroll className="h-full w-full text-primary" />
            </div>
            <div className="absolute top-1/3 right-12 w-20 h-20 opacity-[0.03] pointer-events-none" style={{ willChange: 'opacity' }}>
                <Shield className="h-full w-full text-primary" />
            </div>
            <div className="absolute bottom-1/4 left-16 w-20 h-20 opacity-[0.03] pointer-events-none" style={{ willChange: 'opacity' }}>
                <Swords className="h-full w-full text-primary" />
            </div>
            <div className="absolute bottom-32 right-8 w-24 h-24 opacity-[0.03] pointer-events-none" style={{ willChange: 'opacity' }}>
                <Scroll className="h-full w-full text-primary" />
            </div>

            <header className="text-center mb-20 relative z-10">
                <h1 className="font-headline font-bold text-5xl md:text-6xl text-primary mb-6">{t('about.title')}</h1>
                <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t('about.subtitle')}</p>

                {/* Decorative divider */}
                <div className="mt-8 flex items-center justify-center gap-4">
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-primary"></div>
                    <Shield className="h-6 w-6 text-primary" />
                    <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-primary"></div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 relative z-10">
                <div className="lg:col-span-2 space-y-10">

                    {/* Story Section */}
                    <section>
                        <Card className="border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-4 text-primary font-headline text-2xl md:text-3xl">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <Users className="h-8 w-8" />
                                    </div>
                                    {t('about.story.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 text-foreground/90 leading-relaxed pt-2">
                                <p className="text-lg md:text-xl text-primary/90 border-l-4 border-primary pl-6 py-2 italic font-medium bg-primary/5 rounded-r-lg">
                                    {t('about.p1')}
                                </p>
                                <p className="text-base md:text-lg leading-relaxed">
                                    {t('about.p2')}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Section divider */}
                        <div className="my-12 flex items-center justify-center gap-3">
                            <div className="h-px w-full max-w-[100px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
                            <Scroll className="h-5 w-5 text-primary/40" />
                            <div className="h-px w-full max-w-[100px] bg-gradient-to-l from-transparent via-border to-transparent"></div>
                        </div>
                    </section>

                    {/* Events Section */}
                    <section>
                        <Card className="border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-4 text-primary font-headline text-2xl md:text-3xl">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <Calendar className="h-8 w-8" />
                                    </div>
                                    {t('about.events.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-foreground/90 leading-relaxed pt-2">
                                 <p className="text-base md:text-lg leading-relaxed">
                                    {t('about.p3')}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Section divider */}
                        <div className="my-12 flex items-center justify-center gap-3">
                            <div className="h-px w-full max-w-[100px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
                            <Shield className="h-5 w-5 text-primary/40" />
                            <div className="h-px w-full max-w-[100px] bg-gradient-to-l from-transparent via-border to-transparent"></div>
                        </div>
                    </section>

                    {/* Games Section */}
                    <section>
                        <Card className="border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-4 text-primary font-headline text-2xl md:text-3xl">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <Gamepad2 className="h-8 w-8" />
                                    </div>
                                    {t('about.games.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5 text-foreground/90 leading-relaxed pt-2">
                                <p className="text-base md:text-lg leading-relaxed">
                                    {t('about.p4')}
                                </p>
                                <p className="text-base md:text-lg leading-relaxed">
                                    {t('about.p5')}
                                </p>
                            </CardContent>
                        </Card>
                    </section>

                </div>

                <aside className="lg:col-span-1 space-y-10 lg:sticky lg:top-28 lg:self-start">
                     {aboutImage && (
                        <div className="overflow-hidden rounded-xl shadow-2xl border-2 border-primary/20 transition-all duration-500 hover:border-primary/50 hover:shadow-primary/20">
                            <Image
                                src={aboutImage.imageUrl}
                                alt={aboutImage.description}
                                width={600}
                                height={400}
                                priority
                                data-ai-hint={aboutImage.imageHint}
                                className="object-cover w-full h-auto transition-transform duration-700 hover:scale-110"
                            />
                        </div>
                    )}

                    {/* Decorative divider for sidebar */}
                    <div className="flex items-center justify-center gap-3 py-4">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"></div>
                        <Swords className="h-5 w-5 text-primary/40" />
                        <div className="h-px w-full bg-gradient-to-l from-transparent via-border to-transparent"></div>
                    </div>

                    <Card className="text-center p-8 border-2 border-border/50 bg-gradient-to-br from-card via-card/95 to-primary/5 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-2">
                        <div className="mb-4">
                            <Shield className="h-12 w-12 text-primary mx-auto" />
                        </div>
                        <h2 className="font-headline font-bold text-2xl md:text-3xl text-primary mb-3">{t('about.social.title')}</h2>
                        <p className="mt-2 text-base md:text-lg text-muted-foreground leading-relaxed">{t('about.social.subtitle')}</p>

                        {/* Decorative mini divider */}
                        <div className="my-6 flex items-center justify-center gap-2">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30"></div>
                        </div>

                        <div className="mt-6 flex justify-center gap-8">
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
                                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                                >
                                  <Facebook className="h-8 w-8 text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110" />
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
                                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                                >
                                  <Instagram className="h-8 w-8 text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110" />
                                </motion.div>
                            </Link>
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
