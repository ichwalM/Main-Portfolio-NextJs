export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

/** Shape of Laravel's 422 validation errors */
export interface ContactErrors {
  name?: string[];
  email?: string[];
  subject?: string[];
  message?: string[];
}

/**
 * Thrown when backend returns 422 Unprocessable Entity.
 * Contains per-field errors from Laravel's validation.
 */
export class ContactValidationError extends Error {
  constructor(
    message: string,
    public readonly errors: ContactErrors
  ) {
    super(message);
    this.name = 'ContactValidationError';
  }
}
