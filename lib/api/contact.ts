import { ContactValidationError } from '@/types/contact';
import type { ContactPayload, ContactResponse } from '@/types/contact';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

/**
 * Send contact message to the Laravel API.
 *
 * Endpoint : POST /api/contact?api_key=KEY
 * Success  : 200 { success: true, message: "..." }
 * Validate : 422 { success: false, message: "...", errors: { name: [...], email: [...] } }
 * Auth fail: 401 { message: "API Key check failed: ..." }
 */
export async function sendContactMessage(
  payload: ContactPayload
): Promise<ContactResponse> {
  const qs = API_KEY ? `?api_key=${API_KEY}` : '';
  const url = `${API_BASE_URL}/contact${qs}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  // Parse body regardless of status
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // 422 Unprocessable — throw with field errors attached
    if (response.status === 422) {
      const err = new ContactValidationError(
        data?.message || 'Validation failed.',
        data?.errors ?? {}
      );
      throw err;
    }

    // 401 — API key problem
    if (response.status === 401) {
      throw new Error(data?.message || 'Unauthorized. Please check the API key.');
    }

    // Everything else (500, etc.)
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data as ContactResponse;
}
