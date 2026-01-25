import { apiClient } from './client';
import type { About } from '@/types/about';

export async function getAbout(): Promise<About> {
  return apiClient<About>('/about');
}
