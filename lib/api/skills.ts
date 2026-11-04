import { apiClient } from './client';
import type { SkillsResponse } from '@/types/skill';

export async function getSkills(): Promise<SkillsResponse> {
  return apiClient<SkillsResponse>('/skills');
}
