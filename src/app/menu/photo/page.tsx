'use client';

import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ZoomIn, ChevronLeft, ChevronRight, X, Maximize2, Beer, Wine } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useHaptic } from '@/hooks/useHaptic';

export default function MenuPhotoPage() {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { triggerHaptic } = useHaptic();
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const menuPhotos = PlaceHolderImages.filter(p =>
    p.id.startsWith('menu-photo')
  );

  const selectedImage = selectedImageIndex !== null ? menuPhotos[selectedImageIndex] : null;

  // Preload adjacent images when viewing an image
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const preloadImage = (index: number) => {
      if (index >= 0 && index < menuPhotos.length) {
        const image = menuPhotos[index];
        if (image) {
          const img = new window.Image();
          img.src = image.imageUrl;
        }
      }
    };

    // Preload previous and next images
    preloadImage(selectedImageIndex - 1);
    preloadImage(selectedImageIndex + 1);
  }, [selectedImageIndex, menuPhotos]);

  // Clean up transition timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const handleNext = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex < menuPhotos.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      triggerHaptic('selection');

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      // Immediately change image with smooth transition
      setSelectedImageIndex(selectedImageIndex + 1);

      // Reset transition state after a short delay
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  }, [selectedImageIndex, menuPhotos.length, triggerHaptic, isTransitioning]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      triggerHaptic('selection');

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      // Immediately change image with smooth transition
      setSelectedImageIndex(selectedImageIndex - 1);

      // Reset transition state after a short delay
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
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

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      touchCurrentX.current = touch.clientX;
      isDragging.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch && isDragging.current) {
      touchCurrentX.current = touch.clientX;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;

    const swipeDistanceX = touchCurrentX.current - touchStartX.current;

    if (Math.abs(swipeDistanceX) > 50) {
      if (swipeDistanceX < -50 && selectedImageIndex !== null && selectedImageIndex < menuPhotos.length - 1) {
        handleNext();
      } else if (swipeDistanceX > 50 && selectedImageIndex !== null && selectedImageIndex > 0) {
        handlePrev();
      }
    }

    touchStartX.current = 0;
    touchCurrentX.current = 0;
    touchStartY.current = 0;
    isDragging.current = false;
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    touchCurrentX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      touchCurrentX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;

    const swipeDistanceX = touchCurrentX.current - touchStartX.current;

    if (Math.abs(swipeDistanceX) > 50) {
      if (swipeDistanceX < -50 && selectedImageIndex !== null && selectedImageIndex < menuPhotos.length - 1) {
        handleNext();
      } else if (swipeDistanceX > 50 && selectedImageIndex !== null && selectedImageIndex > 0) {
        handlePrev();
      }
    }

    touchStartX.current = 0;
    touchCurrentX.current = 0;
    touchStartY.current = 0;
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      touchStartX.current = 0;
      touchCurrentX.current = 0;
      touchStartY.current = 0;
      isDragging.current = false;
    }
  };

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
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-12 left-8 w-24 h-24 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000" style={{ willChange: 'opacity' }}>
        <Beer className="h-full w-full text-primary" />
      </div>
      <div className="absolute top-32 right-12 w-20 h-20 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000 delay-200" style={{ willChange: 'opacity' }}>
        <Wine className="h-full w-full text-primary" />
      </div>
      <div className="absolute bottom-32 left-16 w-16 h-16 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000 delay-500" style={{ willChange: 'opacity' }}>
        <Wine className="h-full w-full text-primary" />
      </div>
      <div className="absolute bottom-12 right-8 w-24 h-24 opacity-[0.03] pointer-events-none animate-in fade-in duration-1000 delay-300" style={{ willChange: 'opacity' }}>
        <Beer className="h-full w-full text-primary" />
      </div>

      <header className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
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
            <button
              key={photo.id}
              onClick={() => {
                setSelectedImageIndex(index);
                triggerHaptic('selection');
              }}
              className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
            >
                <Card className="overflow-hidden group relative aspect-[2/3] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <Image
                        src={photo.imageUrl}
                        alt={photo.description}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ width: '100%', height: '100%' }}
                        data-ai-hint={photo.imageHint}
                        loading={index < 3 ? "eager" : "lazy"}
                        priority={index < 3}
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
            className="max-w-[98vw] md:max-w-[95vw] w-auto h-auto bg-black/95 border-none p-4 md:p-8 shadow-none flex items-center justify-center transition-all duration-300 animate-in fade-in zoom-in-95 [&>button]:hidden"
        >
            <DialogTitle className="sr-only">{selectedImage?.description || "Menu photo"}</DialogTitle>
            <DialogDescription className="sr-only">
              {selectedImage ? `Enlarged view of menu photo: ${selectedImage.description}` : "Enlarged menu photo view"}
            </DialogDescription>

            {selectedImage && (
              <div
                ref={imageContainerRef}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className="relative flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 cursor-grab active:cursor-grabbing select-none"
                style={{ touchAction: 'pan-y' }}
              >
                {/* Top controls */}
                <div className="absolute top-2 right-2 flex gap-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-black/70 text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 cursor-pointer"
                    onClick={toggleFullscreen}
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-black/70 text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 hover:rotate-90 cursor-pointer"
                    onClick={() => setSelectedImageIndex(null)}
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Image counter */}
                <div className="absolute top-2 left-2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  {selectedImageIndex !== null && `${selectedImageIndex + 1} / ${menuPhotos.length}`}
                </div>

                {/* Previous button */}
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
                <Image
                    key={selectedImage.id}
                    src={selectedImage.imageUrl}
                    alt={selectedImage.description}
                    width={1200}
                    height={1800}
                    className="object-contain max-w-[85vw] md:max-w-[80vw] max-h-[90vh] rounded-lg shadow-2xl select-none"
                    style={{ width: 'auto', height: 'auto' }}
                    data-ai-hint={selectedImage.imageHint}
                    priority
                    draggable={false}
                />

                {/* Next button */}
                {selectedImageIndex !== null && selectedImageIndex < menuPhotos.length - 1 && (
                   <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 md:h-14 md:w-14 bg-black/70 text-white hover:bg-black/90 z-50 transition-all duration-300 hover:scale-110 hover:translate-x-1 animate-in fade-in slide-in-from-right-4 duration-300 cursor-pointer"
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-7 w-7 md:h-9 md:w-9" />
                  </Button>
                )}

                {/* Hidden preload images for adjacent images */}
                <div className="hidden">
                  {selectedImageIndex !== null && selectedImageIndex > 0 && (() => {
                    const prevImage = menuPhotos[selectedImageIndex - 1];
                    return prevImage ? (
                      <Image
                        src={prevImage.imageUrl}
                        alt="preload"
                        width={1200}
                        height={1800}
                        priority
                      />
                    ) : null;
                  })()}
                  {selectedImageIndex !== null && selectedImageIndex < menuPhotos.length - 1 && (() => {
                    const nextImage = menuPhotos[selectedImageIndex + 1];
                    return nextImage ? (
                      <Image
                        src={nextImage.imageUrl}
                        alt="preload"
                        width={1200}
                        height={1800}
                        priority
                      />
                    ) : null;
                  })()}
                </div>
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
