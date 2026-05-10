'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { getMenuData, type MenuCategory } from "@/lib/menu-data";
import { useEffect, useState } from "react";

export default function MenuClient() {
    const { t, lang } = useLanguage();
    const [currentMenu, setCurrentMenu] = useState<MenuCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function loadMenu() {
            setLoading(true);
            try {
                const menuData = await getMenuData(lang);
                if (mounted) {
                    setCurrentMenu(menuData);
                }
            } catch (error) {
                console.error('Failed to load menu:', error);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadMenu();

        return () => {
            mounted = false;
        };
    }, [lang]);

    if (loading) {
        return (
            <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h1 className="font-headline font-bold text-5xl md:text-6xl text-primary">{t('menu.title')}</h1>
                    <p className="mt-4 text-xl text-muted-foreground">{t('menu.subtitle')}</p>
                </header>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-card/50 animate-pulse rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
                <h1 className="font-headline font-bold text-5xl md:text-6xl text-primary">{t('menu.title')}</h1>
                <p className="mt-4 text-xl text-muted-foreground">{t('menu.subtitle')}</p>
                <div className="mt-6">
                    <Button asChild variant="outline">
                        <Link href="/menu/photo">{t('menu.photoButton')}</Link>
                    </Button>
                </div>
            </header>

            <Accordion type="multiple" defaultValue={currentMenu.length > 0 && currentMenu[0] ? [currentMenu[0].name] : []} className="w-full">
                {currentMenu.map((category) => (
                    <AccordionItem key={category.name} value={category.name} className="border-b-primary/20">
                        <AccordionTrigger className="text-xl sm:text-2xl font-headline font-bold hover:no-underline py-6 text-left px-4 rounded-md transition-all duration-300 hover:bg-primary/10 hover:pl-8">
                           <div className="flex flex-col items-start gap-1">
                             <span className="flex items-center gap-4">{category.name}</span>
                             {category.description && <p className="text-sm font-normal text-muted-foreground text-left">{category.description}</p>}
                           </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="divide-y divide-border">
                             {category.items.map((item, index) => (
                                item.isSubheader ? (
                                    <h4 key={`${item.name}-${index}`} className="text-xl font-bold text-primary/90 pt-6 pb-2 font-headline px-4">{item.name}</h4>
                                ) : (
                                <div key={`${item.name}-${index}`} className="py-4 flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 sm:items-center px-4 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:pl-8">
                                    <div className="col-span-2">
                                        <h4 className="text-lg font-semibold text-foreground">{item.name}</h4>
                                        {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                                    </div>
                                    <div className="col-span-1 sm:text-right font-mono text-lg text-primary sm:self-center">
                                        {item.price}
                                    </div>
                                </div>
                                )
                             ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
