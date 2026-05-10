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

  // Google Maps URL for the place
  const placeUrl = 'https://www.google.com/maps/place/Dungeon+Pub/@48.1530559,17.1041321,17z/data=!3m1!4b1!4m6!3m5!1s0x476c8950c93cd07f:0x1cd966cb0c6826d!8m2!3d48.1530523!4d17.106707!16s%2Fg%2F11bwbwp996?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D';

  return <GoogleReviewsDisplay placeDetails={data} placeUrl={placeUrl} />;
}

export default function ReviewsPage() {
  return <ReviewsSection />;
}
