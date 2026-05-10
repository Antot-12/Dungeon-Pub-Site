import { Metadata } from 'next';
import GalleryClient from './gallery-client';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Captured moments from Dungeon Pub - game nights, events, community, and atmosphere. See what adventures await at our fantasy gaming pub.',
  openGraph: {
    title: 'Gallery | Dungeon Pub',
    description: 'Captured moments from our fantasy gaming pub - game nights, events, and community.',
    images: ['/images/galery/1.jpg'],
  },
};

export default function GalleryPage() {
  return (
    <ErrorBoundary>
      <GalleryClient />
    </ErrorBoundary>
  );
}
