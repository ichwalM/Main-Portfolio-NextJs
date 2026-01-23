import { apiClient } from './client';
import type { ProfileResponse } from '@/types/profile';

export async function getProfile(): Promise<ProfileResponse> {
  return apiClient<ProfileResponse>('/profile');
}
