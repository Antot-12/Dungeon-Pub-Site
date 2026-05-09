import { Metadata } from 'next';
import MenuClient from './menu-client';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Explore our fantasy-inspired menu featuring craft cocktails, beers, wines, spirits, and snacks. From Mana Potions to traditional drinks.',
  openGraph: {
    title: 'Menu | Dungeon Pub',
    description: 'Explore our fantasy-inspired menu featuring craft cocktails, beers, wines, spirits, and snacks.',
    images: ['/images/menus/cocktails.1.list.png'],
  },
};

export default function MenuPage() {
  return <MenuClient />;
}
