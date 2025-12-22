import { create } from 'zustand';
import type { SkillsJson } from '../types/skills';

interface SkillsState {
  skillsData: SkillsJson | null;
  setSkillsData: (data: SkillsJson) => void;
}

export const useSkillsStore = create<SkillsState>(set => ({
  skillsData: null,
  setSkillsData: data => set({ skillsData: data }),
}));
