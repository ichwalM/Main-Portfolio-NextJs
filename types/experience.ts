export interface Experience {
  company: string;
  role: string; // API uses 'role' not 'position'
  description: string;
  start_date: string;
  end_date: string | null;
  location?: string;
}

// API returns Experience[] directly, no wrapper
export type ExperiencesResponse = Experience[];
