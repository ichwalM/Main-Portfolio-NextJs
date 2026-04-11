export interface Project {
  id: number;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  tech_stack?: string | string[];
  github_url?: string;
  demo_url?: string;
  featured?: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectsResponse {
  data: Project[];
  links?: any;
}

// API returns Project directly (no data wrapper)
export type ProjectDetailResponse = Project;
