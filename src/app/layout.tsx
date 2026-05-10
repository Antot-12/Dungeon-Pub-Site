import type { Metadata } from 'next';
import './globals.css';
import { Cormorant_Garamond, EB_Garamond } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from "@/components/ui/toaster";
import Template from './template';

const fontHeadline = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-headline',
  display: 'swap',
  preload: true,
});

const fontBody = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Dungeon Pub | Fantasy Gaming Pub in Bratislava',
    template: '%s | Dungeon Pub'
  },
  description: 'Your destination for fantasy, games, and great drinks in the heart of Bratislava. RPG sessions, board games, themed events, and craft cocktails.',
  keywords: ['dungeon pub', 'board games', 'rpg', 'fantasy pub', 'gaming bar', 'bratislava', 'craft cocktails', 'game nights'],
  authors: [{ name: 'Dungeon Pub' }],
  creator: 'Dungeon Pub',
  publisher: 'Dungeon Pub',
  metadataBase: new URL('https://dungeonpub.sk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dungeon Pub | Fantasy Gaming Pub in Bratislava',
    description: 'Your destination for fantasy, games, and great drinks. RPG sessions, board games, themed events, and craft cocktails.',
    url: 'https://dungeonpub.sk',
    siteName: 'Dungeon Pub',
    images: [
      {
        url: '/images/Dungeon_Pub_main.jpg',
        width: 1200,
        height: 630,
        alt: 'Dungeon Pub - Fantasy Gaming Pub',
      },
    ],
    locale: 'sk_SK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dungeon Pub | Fantasy Gaming Pub in Bratislava',
    description: 'Your destination for fantasy, games, and great drinks.',
    images: ['/images/Dungeon_Pub_main.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: 'Dungeon Pub',
    description: 'Fantasy-themed gaming pub with RPG sessions, board games, and craft cocktails',
    image: 'https://dungeonpub.sk/images/Dungeon_Pub_main.jpg',
    '@id': 'https://dungeonpub.sk',
    url: 'https://dungeonpub.sk',
    telephone: '',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Štefánikova 869/14',
      addressLocality: 'Bratislava',
      postalCode: '811 05',
      addressCountry: 'SK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.1496,
      longitude: 17.1075,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Monday',
        opens: '16:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
        opens: '16:00',
        closes: '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '16:00',
        closes: '02:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '16:00',
        closes: '22:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/dungeonpub',
    ],
    servesCuisine: 'Bar',
    hasMenu: 'https://dungeonpub.sk/menu',
  };

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontHeadline.variable,
          fontBody.variable
        )}
      >
        <LanguageProvider>
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main id="main-content" className="flex-1">
              <Template>{children}</Template>
            </main>
            <Footer />
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
