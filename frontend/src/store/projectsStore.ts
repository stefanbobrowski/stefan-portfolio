import { create } from 'zustand';
import type { ProjectList } from '../types/projects';

interface ProjectsState {
  projects: ProjectList;
  setProjects: (data: ProjectList) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useProjectsStore = create<ProjectsState>(set => ({
  projects: [],
  loading: true,
  setProjects: data => set({ projects: data }),
  setLoading: loading => set({ loading }),
}));
