import type { ContactPayload, ContactResponse } from '@/types/contact';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

/**
 * Send contact message to the Laravel API.
 * Endpoint: POST /api/contact
 *
 * NOTE: If the backend endpoint is not yet ready, this will throw.
 * The ContactForm component handles the error state gracefully.
 */
export async function sendContactMessage(payload: ContactPayload): Promise<ContactResponse> {
  const separator = API_KEY ? '?api_key=' + API_KEY : '';
  const url = `${API_BASE_URL}/contact${separator}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.message || `Request failed: ${response.status}`);
  }

  return response.json();
}
