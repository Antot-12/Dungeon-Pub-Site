'use server';

/**
 * Google Places API integration for fetching reviews
 * Requires GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in environment variables
 */

export type GoogleReview = {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
};

export type PlaceDetails = {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
};

export async function getGoogleReviews(): Promise<{ data?: PlaceDetails; error?: string }> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    // Silently return without error - reviews section will be hidden
    return { error: 'not_configured' };
  }

  try {
    const fields = 'name,rating,user_ratings_total,reviews';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}&language=sk`;

    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Revalidate once per day
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Places API Error:', errorData);
      return { error: 'Failed to fetch reviews from Google.' };
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API returned non-OK status:', data.status);
      return { error: `Google Places API error: ${data.status}` };
    }

    return { data: data.result };
  } catch (error: any) {
    console.error('Failed to fetch Google reviews:', error);
    return { error: error.message || 'An unknown error occurred.' };
  }
}
