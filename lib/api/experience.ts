import { apiClient } from './client';
import type { ExperiencesResponse } from '@/types/experience';

export async function getExperiences(): Promise<ExperiencesResponse> {
  return apiClient<ExperiencesResponse>('/experiences');
}
