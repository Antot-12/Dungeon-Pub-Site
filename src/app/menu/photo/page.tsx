'use client';

import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useMemo, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function MenuPhotoPage() {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const menuPhotos = PlaceHolderImages.filter(p =>
    p.id.startsWith('menu-photo')
  );

  const selectedImage = selectedImageIndex !== null ? menuPhotos[selectedImageIndex] : null;

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => 
        prevIndex === null ? null : Math.min(prevIndex + 1, menuPhotos.length - 1)
      );
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => 
        prevIndex === null ? null : Math.max(prevIndex - 1, 0)
      );
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="font-headline font-bold text-[2.25rem] md:text-[3.5rem] lg:text-[5rem] text-primary">
          {t('menuPhoto.title')}
        </h1>
        <p className="mt-4 text-[1.125rem] md:text-[1.5rem] lg:text-[1.75rem] text-muted-foreground">
          {t('menuPhoto.subtitle')}
        </p>
      </header>

      {menuPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuPhotos.map((photo, index) => (
            <button key={photo.id} onClick={() => setSelectedImageIndex(index)} className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">
                <Card className="overflow-hidden group relative aspect-[2/3] transition-all duration-300 hover:-translate-y-1">
                    <Image
                        src={photo.imageUrl}
                        alt={photo.description}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={photo.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn className="h-12 w-12 text-white/80" />
                    </div>
                </Card>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center">Menu photos not available.</p>
      )}

      <Dialog open={selectedImageIndex !== null} onOpenChange={(isOpen) => { if (!isOpen) setSelectedImageIndex(null); }}>
        <DialogContent 
            onClick={() => setSelectedImageIndex(null)}
            className="max-w-[95vw] md:max-w-[90vw] w-auto h-auto bg-transparent border-none p-0 shadow-none flex items-center justify-center"
        >
            {selectedImage && (
              <div onClick={(e) => e.stopPropagation()} className="relative flex items-center justify-center">
                <DialogTitle className="sr-only">{selectedImage.description}</DialogTitle>
                <DialogDescription className="sr-only">Enlarged view of menu photo: {selectedImage.description}</DialogDescription>
                
                {selectedImageIndex !== null && selectedImageIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 md:h-12 md:w-12 bg-black/50 text-white hover:bg-black/70 z-50"
                    onClick={handlePrev}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                  </Button>
                )}
                
                <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.description}
                    width={1200}
                    height={1800}
                    className="object-contain max-w-[85vw] md:max-w-[80vw] max-h-[90vh] rounded-lg shadow-2xl"
                    data-ai-hint={selectedImage.imageHint}
                />

                {selectedImageIndex !== null && selectedImageIndex < menuPhotos.length - 1 && (
                   <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 md:h-12 md:w-12 bg-black/50 text-white hover:bg-black/70 z-50"
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                  </Button>
                )}
              </div>
            )}
        </DialogContent>
      </Dialog>

      <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg" variant="outline" className="text-lg md:text-xl px-8 py-6">
          <Link href="/menu">{t('menuPhoto.backButton')}</Link>
        </Button>
        <Button asChild size="lg" className="text-lg md:text-xl px-8 py-6">
          <Link href="/">{t('menuPhoto.homeButton')}</Link>
        </Button>
      </div>
    </div>
  );
}
