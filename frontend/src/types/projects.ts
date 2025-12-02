export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  title: string;
  slug: string;
  year: number;
  type: 'external' | 'internal';
  status: 'live' | 'development' | 'building';
  description: string;
  tech: string[];
  highlights: string[];
  links: ProjectLinks;
  thumbnail: string;
}

export type ProjectList = Project[];
