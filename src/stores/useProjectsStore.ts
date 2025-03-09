
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project } from '@/types';

interface ProjectsState {
  projects: Project[];
  selectedProjectId: string | null;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  selectProject: (id: string | null) => void;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set) => ({
      projects: [],
      selectedProjectId: null,
      addProject: (project) => 
        set((state) => ({ 
          projects: [...state.projects, project] 
        })),
      updateProject: (id, updates) => 
        set((state) => ({ 
          projects: state.projects.map((project) => 
            project.id === id ? { ...project, ...updates } : project
          ) 
        })),
      deleteProject: (id) => 
        set((state) => ({ 
          projects: state.projects.filter((project) => project.id !== id) 
        })),
      selectProject: (id) => 
        set({ selectedProjectId: id }),
    }),
    {
      name: 'projects-storage',
    }
  )
);
