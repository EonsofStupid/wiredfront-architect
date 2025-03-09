
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Project } from '@/types';

// Mock API functions - replace with actual API calls later
const fetchProjects = async (): Promise<Project[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Return mock data for now
  return [
    { id: '1', name: 'E-commerce Platform', type: 'React', lastEdited: '2 hours ago', owner: 'user-1' },
    { id: '2', name: 'Task Management App', type: 'Vue', lastEdited: '5 hours ago', owner: 'user-1' },
    { id: '3', name: 'Portfolio Website', type: 'Next.js', lastEdited: 'Yesterday', owner: 'user-1' },
    { id: '4', name: 'Mobile Game UI', type: 'React Native', lastEdited: '3 days ago', owner: 'user-1' },
  ];
};

const createProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Return mocked created project
  return {
    ...project,
    id: Math.random().toString(36).substring(2, 9),
  };
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const projects = await fetchProjects();
      const project = projects.find(p => p.id === id);
      if (!project) throw new Error('Project not found');
      return project;
    },
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
