import { apiClient } from './client';
import type { WallAppsResponse } from '@/types/wall-app';

export async function getWallApps(): Promise<WallAppsResponse> {
  // NEXT_PUBLIC_API_URL already includes /v1, so we just append /wall-apps
  return apiClient<WallAppsResponse>('/wall-apps');
}
