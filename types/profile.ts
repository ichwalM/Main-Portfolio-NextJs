export interface Profile {
  id: number;
  name: string;
  bio: string | null;
  hero_image: string | null;
  resume_link: string | null;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  } | null;
  email?: string | null;
  open_work?: boolean;
}

// API returns Profile directly, no wrapper
export type ProfileResponse = Profile;
