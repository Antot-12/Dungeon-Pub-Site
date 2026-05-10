import HomePageClient from './HomePageClient';
import ReviewsSection from '@/components/ReviewsSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default async function Home() {
  return (
    <>
      <ErrorBoundary>
        <HomePageClient />
      </ErrorBoundary>
      <ErrorBoundary>
        <ReviewsSection />
      </ErrorBoundary>
    </>
  );
}
