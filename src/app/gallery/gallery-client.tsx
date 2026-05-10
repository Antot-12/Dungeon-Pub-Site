'use client';

import { Card } from '@/components/ui/card';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHaptic } from '@/hooks/useHaptic';

export default function GalleryClient() {
  const { t } = useLanguage();
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const { triggerHaptic } = useHaptic();
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const selectedImage = selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;

  const handleNext = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
      triggerHaptic('selection');
    }
  }, [selectedImageIndex, galleryImages.length, triggerHaptic]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
      triggerHaptic('selection');
    }
  }, [selectedImageIndex, triggerHaptic]);

  // Swipe gesture handling
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (selectedImageIndex !== null) {
        touchStartX.current = e.touches[0]?.clientX ?? 0;
        touchStartY.current = e.touches[0]?.clientY ?? 0;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (selectedImageIndex !== null) {
        touchCurrentX.current = e.touches[0]?.clientX ?? 0;
      }
    };

    const handleTouchEnd = () => {
      if (selectedImageIndex !== null) {
        const swipeDistanceX = touchCurrentX.current - touchStartX.current;
        const swipeDistanceY = Math.abs((touchCurrentX.current - touchStartX.current));

        // Only trigger swipe if horizontal movement is dominant (not vertical scroll)
        if (Math.abs(swipeDistanceX) > 100 && Math.abs(swipeDistanceX) > swipeDistanceY) {
          if (swipeDistanceX < -100 && selectedImageIndex < galleryImages.length - 1) {
            // Swipe left - next image
            handleNext();
          } else if (swipeDistanceX > 100 && selectedImageIndex > 0) {
            // Swipe right - previous image
            handlePrev();
          }
        }

        touchStartX.current = 0;
        touchCurrentX.current = 0;
        touchStartY.current = 0;
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [selectedImageIndex, galleryImages.length, handleNext, handlePrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    if (selectedImageIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex, handleNext, handlePrev]);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="font-headline font-bold text-5xl md:text-6xl text-primary">{t('gallery.title')}</h1>
        <p className="mt-4 text-xl text-muted-foreground">{t('gallery.subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <button key={image.id} onClick={() => setSelectedImageIndex(index)} className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">
            <Card className="overflow-hidden group relative aspect-square transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={image.imageHint}
                placeholder={image.blurDataURL ? "blur" : "empty"}
                blurDataURL={image.blurDataURL}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{image.description}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="h-12 w-12 text-white/80" />
              </div>
            </Card>
          </button>
        ))}
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={(isOpen) => { if (!isOpen) setSelectedImageIndex(null); }}>
        <DialogContent 
          onClick={() => setSelectedImageIndex(null)}
          className="max-w-[95vw] md:max-w-[90vw] w-auto h-auto bg-transparent border-none p-0 shadow-none flex items-center justify-center"
        >
            {selectedImage && (
              <div onClick={(e) => e.stopPropagation()} className="relative flex items-center justify-center">
                <DialogTitle className="sr-only">{selectedImage.description}</DialogTitle>
                <DialogDescription className="sr-only">Enlarged view of: {selectedImage.description}</DialogDescription>
                
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
                    width={1920}
                    height={1080}
                    className="object-contain max-w-[85vw] md:max-w-[80vw] max-h-[90vh] rounded-lg shadow-2xl"
                    data-ai-hint={selectedImage.imageHint}
                />
                
                {selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1 && (
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
    </div>
  );
}

    