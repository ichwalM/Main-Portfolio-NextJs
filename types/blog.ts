export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail?: string;
  additional_photos?: string[];
  published_at: string;
  reading_time?: number;
  tags?: string[];
}

export interface BlogPostsResponse {
  current_page: number;
  data: BlogPost[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

