export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  published_at: string;
  reading_time?: number;
  tags?: string[];
}

export interface BlogPostsResponse {
  data: BlogPost[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface BlogPostDetailResponse {
  data: BlogPost;
}
