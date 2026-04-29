import { apiClient } from './client';
import type { ProjectsResponse, ProjectDetailResponse } from '@/types/project';

export async function getProjects(page = 1): Promise<ProjectsResponse> {
  return apiClient<ProjectsResponse>(`/projects?page=${page}`);
}

// API returns the project object directly (no { data: ... } wrapper)
export async function getProjectBySlug(slug: string): Promise<ProjectDetailResponse> {
  return apiClient<ProjectDetailResponse>(`/projects/${slug}`);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const response = await getProjects();
  return response.data.map((project) => project.slug);
}
