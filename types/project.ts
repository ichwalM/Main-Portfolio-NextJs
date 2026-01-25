export interface Project {
  id: number;
  title: string;
  slug: string;
  description?: string; // Optional
  thumbnail?: string; // Optional
  tech_stack?: string | string[]; // Optional, can be string or array
  github_url?: string;
  demo_url?: string;
  featured?: boolean;
  created_at?: string;
}

export interface ProjectsResponse {
  data: Project[];
  links?: any;
}

export interface ProjectDetailResponse {
  data: Project;
}
