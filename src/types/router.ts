
import { User } from '@/types';
import { QueryClient } from '@tanstack/react-query';

// Define all possible route paths
export type RoutePath = '/' | '/admin/dashboard' | '/user/overview' | '*';

// Search parameters for each route
export interface SearchParams {
  '/': Record<string, never>;
  '/admin/dashboard': { view?: string };
  '/user/overview': { tab?: string };
  '*': Record<string, never>;
}

// Base router context interface
export interface RouterContext {
  queryClient: QueryClient;
  isAuthenticated: boolean;
  role: string;
  isAdmin: boolean;
  isLoading: boolean;
}
