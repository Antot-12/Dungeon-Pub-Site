'use server';

/**
 * SerpApi integration for fetching Google reviews
 * Fetches reviews once per day via serverless function
 */

export type GoogleReview = {
  author_name: string;
  author_url?: string;
  language?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time?: number;
  date?: string;
  iso_date?: string;
};

export type PlaceDetails = {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
};

export async function getGoogleReviews(): Promise<{ data?: PlaceDetails; error?: string }> {
  const serpApiKey = process.env.SERPAPI_KEY;
  const placeId = 'ChIJf9A8yVCJbEcRbYLGsGyWzQE'; // Dungeon Pub correct place ID

  if (!serpApiKey) {
    return { error: 'not_configured' };
  }

  try {
    const url = `https://serpapi.com/search.json?engine=google_maps_reviews&place_id=${placeId}&api_key=${serpApiKey}&hl=sk&sort_by=newestFirst`;

    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours (once per day)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('SerpApi Error:', errorData);
      return { error: 'Failed to fetch reviews.' };
    }

    const data = await response.json();

    if (data.error) {
      console.error('SerpApi returned error:', data.error);
      return { error: data.error };
    }

    // Transform SerpApi response to match our expected format
    const reviews: GoogleReview[] = (data.reviews || []).map((review: any) => ({
      author_name: review.user?.name || 'Anonymous',
      author_url: review.user?.link,
      profile_photo_url: review.user?.thumbnail,
      rating: review.rating || 0,
      relative_time_description: review.date || '',
      text: review.snippet || review.text || '',
      date: review.date,
      iso_date: review.iso_date,
      language: review.language || 'sk',
    }));

    const placeDetails: PlaceDetails = {
      name: data.place_info?.title || 'Dungeon Pub',
      rating: data.place_info?.rating || 0,
      user_ratings_total: data.place_info?.reviews || 0,
      reviews: reviews,
    };

    return { data: placeDetails };
  } catch (error: any) {
    console.error('Failed to fetch reviews via SerpApi:', error);
    return { error: error.message || 'An unknown error occurred.' };
  }
}
