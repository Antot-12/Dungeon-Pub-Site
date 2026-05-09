'use client';

import { Star, ExternalLink, Shield, Scroll } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import type { GoogleReview, PlaceDetails } from '@/lib/google-reviews';

type ReviewsDisplayProps = {
  placeDetails: PlaceDetails;
  placeUrl?: string;
};

export function GoogleReviewsDisplay({ placeDetails, placeUrl }: ReviewsDisplayProps) {
  const { t } = useLanguage();
  const { name, rating, user_ratings_total, reviews } = placeDetails;

  // Display top 6 reviews
  const displayReviews = reviews?.slice(0, 6) || [];

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rotate-45" />
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-primary/50 rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-primary/30 -rotate-12" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-primary animate-pulse" aria-hidden="true" />
            <h2 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl text-primary">
              Tales from Adventurers
            </h2>
            <Shield className="h-10 w-10 text-primary animate-pulse" aria-hidden="true" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear what fellow travelers say about their quests at the Dungeon Pub
          </p>
        </div>

        {/* Overall Rating Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-card via-card/95 to-primary/5 border-2 border-primary/30 rounded-lg p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:border-primary/60 transition-all duration-500">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary/40" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary/40" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Scroll className="h-8 w-8 text-primary/80" aria-hidden="true" />
                  <h3 className="font-headline text-3xl font-bold text-foreground">
                    {name}
                  </h3>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-7 w-7 ${
                          i < Math.floor(rating)
                            ? 'fill-primary text-primary'
                            : i < rating
                            ? 'fill-primary/50 text-primary/50'
                            : 'fill-muted text-muted'
                        } transition-all duration-300 group-hover:scale-110`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="font-headline text-4xl font-bold text-primary">
                    {rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-muted-foreground text-lg">
                  Based on <span className="font-bold text-foreground">{user_ratings_total}</span> adventurer reviews
                </p>
              </div>

              {placeUrl && (
                <a
                  href={placeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-lg font-bold rounded-md overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/50"
                >
                  <span className="relative z-10">View All on Google</span>
                  <ExternalLink className="h-5 w-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {displayReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayReviews.map((review, index) => (
              <ReviewCard key={`${review.author_name}-${review.time}`} review={review} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No reviews available yet. Be the first to share your adventure!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review, index }: { review: GoogleReview; index: number }) {
  const { author_name, profile_photo_url, rating, text, relative_time_description } = review;

  return (
    <article
      className="group bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out backwards',
      }}
    >
      {/* Decorative top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Review Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-colors duration-300">
            {profile_photo_url ? (
              <Image
                src={profile_photo_url}
                alt={author_name}
                width={56}
                height={56}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {author_name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          {/* Shield decoration */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-card flex items-center justify-center">
            <Shield className="h-3 w-3 text-primary-foreground" aria-hidden="true" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-headline font-bold text-lg text-foreground truncate">
            {author_name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {relative_time_description}
            </span>
          </div>
        </div>
      </div>

      {/* Review Text */}
      <blockquote className="text-foreground/90 leading-relaxed italic border-l-2 border-primary/30 pl-4 group-hover:border-primary/60 transition-colors duration-300">
        &ldquo;{text}&rdquo;
      </blockquote>
    </article>
  );
}

// Loading State Component
export function GoogleReviewsLoading() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-primary animate-pulse" aria-hidden="true" />
            <div className="h-12 w-96 bg-muted/50 rounded-lg animate-pulse" />
            <Shield className="h-10 w-10 text-primary animate-pulse" aria-hidden="true" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-card border-2 border-border/50 rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 flex-1">
                <div className="h-8 w-48 bg-muted/50 rounded animate-pulse" />
                <div className="h-12 w-64 bg-muted/50 rounded animate-pulse" />
                <div className="h-6 w-56 bg-muted/50 rounded animate-pulse" />
              </div>
              <div className="h-14 w-48 bg-muted/50 rounded animate-pulse" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-muted/50 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 bg-muted/50 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-muted/50 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-muted/50 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-muted/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Error State Component
export function GoogleReviewsError({ error }: { error: string }) {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card/80 border-2 border-destructive/30 rounded-lg p-12">
            <Shield className="h-16 w-16 text-destructive/60 mx-auto mb-6" aria-hidden="true" />
            <h3 className="font-headline text-2xl font-bold text-foreground mb-4">
              Quest Failed: Unable to Load Reviews
            </h3>
            <p className="text-muted-foreground mb-6">
              Our scribes are having trouble retrieving the adventurer tales. Please try again later.
            </p>
            {error && (
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Technical details
                </summary>
                <p className="mt-2 text-xs font-mono bg-destructive/10 p-3 rounded text-destructive">
                  {error}
                </p>
              </details>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

<style jsx global>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>
