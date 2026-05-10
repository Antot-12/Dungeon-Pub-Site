'use client';

import { Card } from '@/components/ui/card';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ZoomIn, ChevronLeft, ChevronRight, X, Maximize2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHaptic } from '@/hooks/useHaptic';

// Calculate aspect ratio category for masonry layout
function getAspectRatioClass(image: ImagePlaceholder): string {
  // Parse aspect ratio or use default
  if (image.imageHint.includes('portrait') || image.imageHint.includes('vertical')) {
    return 'row-span-2'; // Tall images
  }
  if (image.imageHint.includes('landscape') || image.imageHint.includes('wide')) {
    return 'col-span-2'; // Wide images
  }
  return ''; // Square/default
}

export default function GalleryClient() {
  const { t, lang } = useLanguage();
  const [loadedImages, setLoadedImages] = useState(9); // Start with 9 images for infinite scroll
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const { triggerHaptic } = useHaptic();
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const observerRef = useRef<HTMLDivElement>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));
  const displayedImages = galleryImages.slice(0, loadedImages);

  const selectedImage = selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;

  // Translate image description
  const getTranslatedDescription = (image: ImagePlaceholder) => {
    const translationKey = `gallery.${image.id}`;
    const translated = t(translationKey);
    return translated === translationKey ? image.description : translated;
  };

  // Clean up transition timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && loadedImages < galleryImages.length) {
          setLoadedImages(prev => Math.min(prev + 6, galleryImages.length));
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loadedImages, galleryImages.length]);

  const handleNext = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1 && !isTransitioning) {
      setDirection('next');
      setIsTransitioning(true);
      triggerHaptic('selection');

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      // Wait for fade out, then change image, then fade in
      requestAnimationFrame(() => {
        transitionTimeoutRef.current = setTimeout(() => {
          setSelectedImageIndex(selectedImageIndex + 1);
          transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
            setDirection(null);
          }, 50);
        }, 200);
      });
    }
  }, [selectedImageIndex, galleryImages.length, triggerHaptic, isTransitioning]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex > 0 && !isTransitioning) {
      setDirection('prev');
      setIsTransitioning(true);
      triggerHaptic('selection');

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      // Wait for fade out, then change image, then fade in
      requestAnimationFrame(() => {
        transitionTimeoutRef.current = setTimeout(() => {
          setSelectedImageIndex(selectedImageIndex - 1);
          transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
            setDirection(null);
          }, 50);
        }, 200);
      });
    }
  }, [selectedImageIndex, triggerHaptic, isTransitioning]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

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

        if (Math.abs(swipeDistanceX) > 100 && Math.abs(swipeDistanceX) > swipeDistanceY) {
          if (swipeDistanceX < -100 && selectedImageIndex < galleryImages.length - 1) {
            handleNext();
          } else if (swipeDistanceX > 100 && selectedImageIndex > 0) {
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
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    if (selectedImageIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex, handleNext, handlePrev, toggleFullscreen]);

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-12 left-12 w-20 h-20 opacity-[0.03] pointer-events-none" style={{ willChange: 'opacity' }}>
        <Camera className="h-full w-full text-primary" />
      </div>
      <div className="absolute bottom-12 right-12 w-20 h-20 opacity-[0.03] pointer-events-none" style={{ willChange: 'opacity' }}>
        <Camera className="h-full w-full text-primary" />
      </div>

      <header className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="font-headline font-bold text-5xl md:text-6xl text-primary">{t('gallery.title')}</h1>
        <p className="mt-4 text-xl text-muted-foreground">{t('gallery.subtitle')}</p>
      </header>

      {displayedImages.length > 0 ? (
        <>
          {/* Masonry grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-3 md:gap-4">
            {displayedImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => {
                  setSelectedImageIndex(index);
                  triggerHaptic('selection');
                }}
                className={`block w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${getAspectRatioClass(image)}`}
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
              >
                <Card className="overflow-hidden group relative h-full transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/30">
                  <Image
                    src={image.imageUrl}
                    alt={getTranslatedDescription(image)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={image.imageHint}
                    placeholder={image.blurDataURL ? "blur" : "empty"}
                    blurDataURL={image.blurDataURL}
                    loading={index < 6 ? "eager" : "lazy"}
                  />
                  {/* Caption overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white text-sm md:text-base font-medium line-clamp-2">{getTranslatedDescription(image)}</p>
                    </div>
                  </div>
                  {/* Zoom icon */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <ZoomIn className="h-12 w-12 text-white/90 transform scale-75 group-hover:scale-100 transition-transform duration-500" />
                  </div>
                </Card>
              </button>
            ))}
          </div>

          {/* Infinite scroll trigger */}
          {loadedImages < galleryImages.length && (
            <div ref={observerRef} className="h-20 flex items-center justify-center mt-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Empty state */
        <div className="text-center py-20 animate-in fade-in zoom-in-95 duration-700">
          <Camera className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6 animate-in fade-in zoom-in-50 duration-500" />
          <h3 className="font-headline text-2xl font-bold text-foreground mb-2">No Photos Yet</h3>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Our gallery is currently empty. Check back soon for photos from our latest adventures and events!
          </p>
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={(isOpen) => { if (!isOpen) setSelectedImageIndex(null); }}>
        <DialogContent
          onClick={() => setSelectedImageIndex(null)}
          className="max-w-[98vw] md:max-w-[95vw] w-auto h-auto bg-black/95 border-none p-4 md:p-8 shadow-none flex items-center justify-center transition-all duration-300 animate-in fade-in zoom-in-95"
        >
            <DialogTitle className="sr-only">
              {selectedImage ? getTranslatedDescription(selectedImage) : "Gallery image"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {selectedImage ? `Enlarged view of: ${getTranslatedDescription(selectedImage)}` : "Enlarged gallery image view"}
            </DialogDescription>

            {selectedImage && (
              <div onClick={(e) => e.stopPropagation()} className="relative flex flex-col items-center justify-center gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Top controls */}
                <div className="absolute top-2 right-2 flex gap-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-black/70 text-white hover:bg-black/90 transition-all duration-300 hover:scale-110"
                    onClick={toggleFullscreen}
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-black/70 text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 hover:rotate-90"
                    onClick={() => setSelectedImageIndex(null)}
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Image counter */}
                <div className="absolute top-2 left-2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  {selectedImageIndex !== null && `${selectedImageIndex + 1} / ${galleryImages.length}`}
                </div>

                {/* Navigation buttons */}
                {selectedImageIndex !== null && selectedImageIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 md:h-14 md:w-14 bg-black/70 text-white hover:bg-black/90 z-50 transition-all duration-300 hover:scale-110 hover:-translate-x-1 animate-in fade-in slide-in-from-left-4 duration-300"
                    onClick={handlePrev}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-7 w-7 md:h-9 md:w-9" />
                  </Button>
                )}

                {/* Main image */}
                <div className={`relative transition-all duration-200 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                  <Image
                      key={selectedImage.id}
                      src={selectedImage.imageUrl}
                      alt={getTranslatedDescription(selectedImage)}
                      width={1920}
                      height={1080}
                      className="object-contain max-w-[90vw] md:max-w-[85vw] max-h-[75vh] md:max-h-[80vh] rounded-lg shadow-2xl"
                      data-ai-hint={selectedImage.imageHint}
                      placeholder={selectedImage.blurDataURL ? "blur" : "empty"}
                      blurDataURL={selectedImage.blurDataURL}
                      priority
                  />
                </div>

                {/* Caption */}
                <div className={`bg-black/70 text-white px-6 py-3 rounded-lg max-w-[90vw] md:max-w-[85vw] text-center transition-all duration-200 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                  <p className="text-sm md:text-base">{getTranslatedDescription(selectedImage)}</p>
                </div>

                {selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1 && (
                   <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 md:h-14 md:w-14 bg-black/70 text-white hover:bg-black/90 z-50 transition-all duration-300 hover:scale-110 hover:translate-x-1 animate-in fade-in slide-in-from-right-4 duration-300"
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-7 w-7 md:h-9 md:w-9" />
                  </Button>
                )}
              </div>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
