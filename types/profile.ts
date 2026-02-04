export interface Profile {
  id: number;
  name: string;
  bio: string;
  hero_image: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  email?: string;
  open_work?: boolean;
}

// API returns Profile directly, no wrapper
export type ProfileResponse = Profile;
