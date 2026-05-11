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
  const isDragging = useRef<boolean>(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
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

  // Preload adjacent images when viewing an image
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const preloadImage = (index: number) => {
      if (index >= 0 && index < galleryImages.length) {
        const image = galleryImages[index];
        if (image) {
          const img = new window.Image();
          img.src = image.imageUrl;
        }
      }
    };

    // Preload previous and next images
    preloadImage(selectedImageIndex - 1);
    preloadImage(selectedImageIndex + 1);
  }, [selectedImageIndex, galleryImages]);

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

      // Immediately change image with smooth transition
      setSelectedImageIndex(selectedImageIndex + 1);

      // Reset transition state after a short delay
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setDirection(null);
      }, 300);
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

      // Immediately change image with smooth transition
      setSelectedImageIndex(selectedImageIndex - 1);

      // Reset transition state after a short delay
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setDirection(null);
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

  // Direct swipe/drag handlers using React events instead of addEventListener
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

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const swipeDistanceX = touchCurrentX.current - touchStartX.current;

    if (Math.abs(swipeDistanceX) > 50) {
      if (swipeDistanceX < -50 && selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1) {
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

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const swipeDistanceX = touchCurrentX.current - touchStartX.current;

    if (Math.abs(swipeDistanceX) > 50) {
      if (swipeDistanceX < -50 && selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1) {
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

  const handleMouseLeave = (e: React.MouseEvent) => {
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
          className="max-w-[98vw] md:max-w-[95vw] w-auto h-auto bg-black/95 border-none p-4 md:p-8 shadow-none flex items-center justify-center transition-all duration-300 animate-in fade-in zoom-in-95 [&>button]:hidden"
        >
            <DialogTitle className="sr-only">
              {selectedImage ? getTranslatedDescription(selectedImage) : "Gallery image"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {selectedImage ? `Enlarged view of: ${getTranslatedDescription(selectedImage)}` : "Enlarged gallery image view"}
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
                className="relative flex flex-col items-center justify-center gap-4 w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500 cursor-grab active:cursor-grabbing select-none"
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
                <div className={`relative transition-opacity duration-150 ease-out`}>
                  <Image
                      key={selectedImage.id}
                      src={selectedImage.imageUrl}
                      alt={getTranslatedDescription(selectedImage)}
                      width={1920}
                      height={1080}
                      className="object-contain max-w-[90vw] md:max-w-[85vw] max-h-[75vh] md:max-h-[80vh] rounded-lg shadow-2xl select-none"
                      data-ai-hint={selectedImage.imageHint}
                      placeholder={selectedImage.blurDataURL ? "blur" : "empty"}
                      blurDataURL={selectedImage.blurDataURL}
                      priority
                      draggable={false}
                  />
                </div>

                {/* Caption */}
                <div className={`bg-black/70 text-white px-6 py-3 rounded-lg max-w-[90vw] md:max-w-[85vw] text-center transition-opacity duration-150 ease-out`}>
                  <p className="text-sm md:text-base">{getTranslatedDescription(selectedImage)}</p>
                </div>

                {selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1 && (
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
                    const prevImage = galleryImages[selectedImageIndex - 1];
                    return prevImage ? (
                      <Image
                        src={prevImage.imageUrl}
                        alt="preload"
                        width={1920}
                        height={1080}
                        priority
                      />
                    ) : null;
                  })()}
                  {selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1 && (() => {
                    const nextImage = galleryImages[selectedImageIndex + 1];
                    return nextImage ? (
                      <Image
                        src={nextImage.imageUrl}
                        alt="preload"
                        width={1920}
                        height={1080}
                        priority
                      />
                    ) : null;
                  })()}
                </div>
              </div>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
