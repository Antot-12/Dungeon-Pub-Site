/**
 * Facebook Graph API Integration
 * Fetches events from a Facebook page
 */

import https from 'https';

const httpsAgent = typeof window === 'undefined' && process.env.NODE_ENV === 'development'
  ? new https.Agent({
      rejectUnauthorized: false,
    })
  : undefined;

export type FacebookEvent = {
  id: string;
  name: string;
  description?: string;
  start_time: string;
  end_time?: string;
  place?: {
    name: string;
    location?: {
      city?: string;
      street?: string;
    };
  };
  cover?: {
    source: string;
    id: string;
  };
  ticket_uri?: string;
  is_online?: boolean;
  event_times?: Array<{
    start: string;
    end?: string;
  }>;
};

export type FacebookEventsResponse = {
  data: FacebookEvent[];
  paging?: {
    cursors?: {
      before: string;
      after: string;
    };
    next?: string;
  };
};

/**
 * Fetch events from Facebook Graph API
 * @param pageId - Facebook Page ID (e.g., 'dungeonpub')
 * @param accessToken - Facebook Page Access Token
 * @param options - Additional options
 * @returns Array of Facebook events
 */
export async function fetchFacebookEvents(
  pageId?: string,
  accessToken?: string,
  options?: {
    limit?: number;
    since?: string; // ISO date string
    until?: string; // ISO date string
  }
): Promise<FacebookEvent[]> {
  const facebookPageId = pageId || process.env.FACEBOOK_PAGE_ID;
  const facebookAccessToken = accessToken || process.env.FACEBOOK_ACCESS_TOKEN;

  if (!facebookPageId) {
    throw new Error('Facebook Page ID is not configured. Please set FACEBOOK_PAGE_ID in your environment.');
  }

  if (!facebookAccessToken) {
    throw new Error('Facebook Access Token is not configured. Please set FACEBOOK_ACCESS_TOKEN in your environment.');
  }

  const limit = options?.limit || 50;
  const params = new URLSearchParams({
    access_token: facebookAccessToken,
    fields: 'id,name,description,start_time,end_time,place,cover,ticket_uri,is_online,event_times',
    limit: limit.toString(),
    time_filter: 'upcoming', // Can be 'upcoming' or 'past'
  });

  // Add time range filters if provided
  if (options?.since) {
    params.append('since', options.since);
  }
  if (options?.until) {
    params.append('until', options.until);
  }

  const url = `https://graph.facebook.com/v21.0/${facebookPageId}/events?${params.toString()}`;

  try {
    const fetchOptions: RequestInit & { agent?: https.Agent } = {
      next: { revalidate: 3600 },
    };

    if (httpsAgent) {
      fetchOptions.agent = httpsAgent;
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Facebook API error:', errorData);
      throw new Error(
        `Facebook API returned ${response.status}: ${
          errorData.error?.message || response.statusText
        }`
      );
    }

    const data: FacebookEventsResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching Facebook events:', error);
    throw error;
  }
}

/**
 * Get long-lived page access token
 * Use this to exchange a short-lived token for a long-lived one
 * @param shortLivedToken - Short-lived user access token
 * @returns Long-lived page access token
 */
export async function getLongLivedPageAccessToken(shortLivedToken: string): Promise<string> {
  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;

  if (!appId || !appSecret) {
    throw new Error('Facebook App ID and Secret must be configured');
  }

  // Step 1: Exchange short-lived token for long-lived user token
  const userTokenUrl = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`;

  const userTokenFetchOptions: RequestInit & { agent?: https.Agent } = {};
  if (httpsAgent) {
    userTokenFetchOptions.agent = httpsAgent;
  }

  const userTokenResponse = await fetch(userTokenUrl, userTokenFetchOptions);
  const userTokenData = await userTokenResponse.json();

  if (userTokenData.error) {
    throw new Error(`Failed to get long-lived user token: ${userTokenData.error.message}`);
  }

  const longLivedUserToken = userTokenData.access_token;

  // Step 2: Get page access token (which is automatically long-lived)
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const pageTokenUrl = `https://graph.facebook.com/v21.0/${pageId}?fields=access_token&access_token=${longLivedUserToken}`;

  const pageTokenFetchOptions: RequestInit & { agent?: https.Agent } = {};
  if (httpsAgent) {
    pageTokenFetchOptions.agent = httpsAgent;
  }

  const pageTokenResponse = await fetch(pageTokenUrl, pageTokenFetchOptions);
  const pageTokenData = await pageTokenResponse.json();

  if (pageTokenData.error) {
    throw new Error(`Failed to get page token: ${pageTokenData.error.message}`);
  }

  return pageTokenData.access_token;
}

/**
 * Validate Facebook Access Token
 * @param accessToken - Access token to validate
 * @returns Token info including expiry and scopes
 */
export async function validateAccessToken(accessToken?: string) {
  const token = accessToken || process.env.FACEBOOK_ACCESS_TOKEN;

  if (!token) {
    throw new Error('No access token provided');
  }

  const url = `https://graph.facebook.com/v21.0/debug_token?input_token=${token}&access_token=${token}`;

  try {
    const fetchOptions: RequestInit & { agent?: https.Agent } = {};
    if (httpsAgent) {
      fetchOptions.agent = httpsAgent;
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.data;
  } catch (error) {
    console.error('Error validating token:', error);
    throw error;
  }
}

/**
 * Fetch a single event by ID
 * @param eventId - Facebook Event ID
 * @param accessToken - Facebook Access Token
 * @returns Event details
 */
export async function fetchFacebookEvent(
  eventId: string,
  accessToken?: string
): Promise<FacebookEvent> {
  const token = accessToken || process.env.FACEBOOK_ACCESS_TOKEN;

  if (!token) {
    throw new Error('Facebook Access Token is not configured');
  }

  const params = new URLSearchParams({
    access_token: token,
    fields: 'id,name,description,start_time,end_time,place,cover,ticket_uri,is_online,event_times',
  });

  const url = `https://graph.facebook.com/v21.0/${eventId}?${params.toString()}`;

  try {
    const fetchOptions: RequestInit & { agent?: https.Agent } = {
      next: { revalidate: 3600 },
    };

    if (httpsAgent) {
      fetchOptions.agent = httpsAgent;
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Facebook API returned ${response.status}: ${
          errorData.error?.message || response.statusText
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Facebook event:', error);
    throw error;
  }
}
