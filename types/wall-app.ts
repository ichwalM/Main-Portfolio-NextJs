export interface WallApp {
  id: number;
  name: string;
  url: string;
  icon: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface WallAppsResponse {
  success: boolean;
  data: WallApp[];
}
