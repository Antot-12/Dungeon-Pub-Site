import HomePageClient from './HomePageClient';
import ReviewsSection from '@/components/ReviewsSection';

export default async function Home() {
  return (
    <>
      <HomePageClient />
      <ReviewsSection />
    </>
  );
}
