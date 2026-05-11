'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { getMenuData, type MenuCategory } from "@/lib/menu-data";
import { useEffect, useState } from "react";
import { Beer, Wine, Coffee, UtensilsCrossed } from "lucide-react";

// Helper function to get category color based on emoji/name
function getCategoryColor(categoryName: string): string {
  // Beer categories
  if (categoryName.includes('🍺') || categoryName.toLowerCase().includes('pivo') || categoryName.toLowerCase().includes('beer')) {
    return 'text-amber-400';
  }
  // Wine categories
  if (categoryName.includes('🍷') || categoryName.toLowerCase().includes('víno') || categoryName.toLowerCase().includes('wine')) {
    return 'text-purple-400';
  }
  // Spirits - Rum
  if (categoryName.includes('🥃') || categoryName.toLowerCase().includes('rum')) {
    return 'text-orange-400';
  }
  // Spirits - Whisky
  if (categoryName.toLowerCase().includes('whisky') || categoryName.toLowerCase().includes('whiskey')) {
    return 'text-yellow-600';
  }
  // Spirits - Vodka
  if (categoryName.toLowerCase().includes('vodka')) {
    return 'text-blue-300';
  }
  // Spirits - Gin
  if (categoryName.toLowerCase().includes('gin')) {
    return 'text-cyan-400';
  }
  // Spirits - Tequila
  if (categoryName.toLowerCase().includes('tequila')) {
    return 'text-lime-400';
  }
  // Cocktails
  if (categoryName.includes('🍹') || categoryName.toLowerCase().includes('cocktail') || categoryName.toLowerCase().includes('kokteil')) {
    return 'text-pink-400';
  }
  // Honey Beer
  if (categoryName.includes('🍯') || categoryName.toLowerCase().includes('med')) {
    return 'text-yellow-400';
  }
  // Coffee
  if (categoryName.includes('☕') || categoryName.toLowerCase().includes('káva') || categoryName.toLowerCase().includes('coffee')) {
    return 'text-amber-700';
  }
  // Tea
  if (categoryName.includes('🍵') || categoryName.toLowerCase().includes('čaj') || categoryName.toLowerCase().includes('tea')) {
    return 'text-green-400';
  }
  // Soft drinks / Non-alcoholic
  if (categoryName.toLowerCase().includes('nealkohol') || categoryName.toLowerCase().includes('non-alcohol') || categoryName.toLowerCase().includes('soft')) {
    return 'text-sky-400';
  }
  // Juice
  if (categoryName.toLowerCase().includes('džús') || categoryName.toLowerCase().includes('juice') || categoryName.toLowerCase().includes('šťava')) {
    return 'text-orange-300';
  }
  // Food/Snacks
  if (categoryName.includes('🍟') || categoryName.toLowerCase().includes('jedlo') || categoryName.toLowerCase().includes('food') || categoryName.toLowerCase().includes('snack') || categoryName.toLowerCase().includes('pochut')) {
    return 'text-red-400';
  }
  // Liqueur
  if (categoryName.toLowerCase().includes('likér') || categoryName.toLowerCase().includes('liqueur')) {
    return 'text-rose-400';
  }
  // Shots
  if (categoryName.toLowerCase().includes('shot')) {
    return 'text-red-500';
  }
  return 'text-primary';
}

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
            <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-12 left-8 w-24 h-24 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000" style={{ willChange: 'opacity' }}>
                    <Beer className="h-full w-full text-primary" />
                </div>
                <div className="absolute top-32 right-12 w-20 h-20 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000 delay-200" style={{ willChange: 'opacity' }}>
                    <Wine className="h-full w-full text-primary" />
                </div>
                <div className="absolute bottom-32 left-16 w-16 h-16 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000 delay-500" style={{ willChange: 'opacity' }}>
                    <Coffee className="h-full w-full text-primary" />
                </div>
                <div className="absolute bottom-12 right-8 w-24 h-24 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000 delay-300" style={{ willChange: 'opacity' }}>
                    <UtensilsCrossed className="h-full w-full text-primary" />
                </div>

                <header className="text-center mb-12">
                    <h1 className="font-headline font-bold text-[2.25rem] md:text-[3.5rem] lg:text-[5rem] text-primary">{t('menu.title')}</h1>
                    <p className="mt-4 text-[1.125rem] md:text-[1.5rem] lg:text-[1.75rem] text-muted-foreground">{t('menu.subtitle')}</p>
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
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-12 left-8 w-24 h-24 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000" style={{ willChange: 'opacity' }}>
                <Beer className="h-full w-full text-primary" />
            </div>
            <div className="absolute top-32 right-12 w-20 h-20 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000 delay-200" style={{ willChange: 'opacity' }}>
                <Wine className="h-full w-full text-primary" />
            </div>
            <div className="absolute bottom-32 left-16 w-16 h-16 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000 delay-500" style={{ willChange: 'opacity' }}>
                <Coffee className="h-full w-full text-primary" />
            </div>
            <div className="absolute bottom-12 right-8 w-24 h-24 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000 delay-300" style={{ willChange: 'opacity' }}>
                <UtensilsCrossed className="h-full w-full text-primary" />
            </div>

            <header className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                <h1 className="font-headline font-bold text-[2.25rem] md:text-[3.5rem] lg:text-[5rem] text-primary">{t('menu.title')}</h1>
                <p className="mt-4 text-[1.125rem] md:text-[1.5rem] lg:text-[1.75rem] text-muted-foreground">{t('menu.subtitle')}</p>
                <div className="mt-6">
                    <Button asChild variant="outline" className="text-lg md:text-xl px-8 py-6">
                        <Link href="/menu/photo">{t('menu.photoButton')}</Link>
                    </Button>
                </div>
            </header>

            <Accordion type="multiple" defaultValue={currentMenu.length > 0 && currentMenu[0]?.name ? [currentMenu[0].name] : []} className="w-full">
                {currentMenu.map((category) => (
                    <AccordionItem key={category.name} value={category.name} className="border-b-primary/20">
                        <AccordionTrigger className={`text-2xl sm:text-3xl font-headline font-bold hover:no-underline py-6 text-left px-4 rounded-md transition-all duration-300 hover:bg-primary/10 hover:pl-8 ${getCategoryColor(category.name)}`}>
                           <div className="flex flex-col items-start gap-2">
                             <span className="flex items-center gap-4">{category.name}</span>
                             {category.description && <p className="text-lg sm:text-xl font-semibold text-muted-foreground text-left">{category.description}</p>}
                           </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="divide-y divide-border">
                             {category.items.map((item, index) => (
                                item.isSubheader ? (
                                    <h4 key={`${item.name}-${index}`} className={`text-xl sm:text-2xl font-bold pt-6 pb-2 font-headline px-4 ${getCategoryColor(category.name)}`}>{item.name}</h4>
                                ) : (
                                <div key={`${item.name}-${index}`} className="py-4 flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 sm:items-center px-4 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:pl-8">
                                    <div className="col-span-2">
                                        <h4 className="text-lg sm:text-xl font-semibold text-foreground">{item.name}</h4>
                                        {item.description && <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>}
                                    </div>
                                    <div className="col-span-1 sm:text-right font-mono text-lg sm:text-xl font-semibold text-primary sm:self-center">
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
