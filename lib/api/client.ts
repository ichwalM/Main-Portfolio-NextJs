const isServer = typeof window === 'undefined';

const API_BASE_URL = (isServer && process.env.INTERNAL_API_URL)
  ? process.env.INTERNAL_API_URL
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
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
