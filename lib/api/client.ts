const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

interface ApiClientOptions extends RequestInit {
  revalidate?: number | false;
}

export async function apiClient<T>(
  endpoint: string,
  options?: ApiClientOptions
): Promise<T> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const separator = endpoint.includes('?') ? '&' : '?';
  const endpointWithKey = apiKey ? `${endpoint}${separator}api_key=${apiKey}` : endpoint;

  const url = `${API_BASE_URL}${endpointWithKey}`;

  // Extract revalidate from options before passing to fetch
  const { revalidate = 86400, ...fetchOptions } = options || {};

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions?.headers,
      },
      // ISR cache: default 24h for static portfolio data
      next: { revalidate },
      ...fetchOptions,
    });

    if (!response.ok) {
      throw new APIError(
        `API request failed: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      0,
      'Network Error'
    );
  }
}

// SWR fetcher for client-side data fetching
export const fetcher = <T>(url: string): Promise<T> => apiClient<T>(url);
