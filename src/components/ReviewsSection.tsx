import { getGoogleReviews } from '@/lib/google-reviews';
import dynamic from 'next/dynamic';

// Lazy load the GoogleReviewsDisplay component to reduce initial bundle size
const GoogleReviewsDisplay = dynamic(
  () => import('@/components/GoogleReviews').then(mod => ({ default: mod.GoogleReviewsDisplay })),
  {
    loading: () => {
      const { GoogleReviewsLoading } = require('@/components/GoogleReviews');
      return <GoogleReviewsLoading />;
    },
    ssr: true,
  }
);

async function ReviewsSection() {
  const { data, error } = await getGoogleReviews();

  // Gracefully hide if API not configured or if there's an error
  if (error || !data) {
    return null;
  }

  // Get Google Maps URL for the place
  const placeUrl = process.env.GOOGLE_PLACE_ID
    ? `https://www.google.com/maps/place/?q=place_id:${process.env.GOOGLE_PLACE_ID}`
    : 'https://g.page/r/YOUR_GOOGLE_BUSINESS_PROFILE';

  return <GoogleReviewsDisplay placeDetails={data} placeUrl={placeUrl} />;
}

export default function ReviewsPage() {
  return <ReviewsSection />;
}
