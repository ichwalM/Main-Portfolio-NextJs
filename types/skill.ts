export interface Skill {
  name: string;
  proficiency: number;
  icon: string;
}

export interface SkillsByCategory {
  [category: string]: Skill[];
}

// API returns SkillsByCategory directly, no wrapper
export type SkillsResponse = SkillsByCategory;
