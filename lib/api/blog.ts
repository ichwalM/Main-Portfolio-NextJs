import { apiClient } from './client';
import type { BlogPostsResponse, BlogPostDetailResponse } from '@/types/blog';

export async function getBlogPosts(page = 1): Promise<BlogPostsResponse> {
  return apiClient<BlogPostsResponse>(`/posts?page=${page}`);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetailResponse> {
  return apiClient<BlogPostDetailResponse>(`/posts/${slug}`);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const response = await getBlogPosts();
  return response.data.map((post) => post.slug);
}
