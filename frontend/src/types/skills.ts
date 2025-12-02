export interface SkillItem {
  name: string;
  url: string;
}

export interface SkillCategory {
  color: string;
  skills: SkillItem[];
}

export interface Skills {
  frontend: SkillCategory;
  backend: SkillCategory;
  cloud: SkillCategory;
  security: SkillCategory;
  devops: SkillCategory;
  design: SkillCategory;
  visualization: SkillCategory;
  ai_tools: SkillCategory;
  game_dev: SkillCategory;
}

export type SkillsJson = Record<string, SkillCategory>;
