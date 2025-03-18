
import { User } from '@/types';
import { QueryClient } from '@tanstack/react-query';
import { type RegisteredRouter, type Registry, type RoutePaths } from '@tanstack/react-router';

export type AppRoutes = 
  | '/'
  | '/admin/dashboard' 
  | '/user/overview' 
  | '*';

// Search parameters for each route
export interface SearchParams {
  '/': {}; 
  '/admin/dashboard': { view?: string };
  '/user/overview': { tab?: string };
  '*': {};
}

// Get route path type with proper typing
export type RoutePath<T extends AppRoutes = AppRoutes> = T;

// Type for our router instance
export type AppRouter = RegisteredRouter<Registry<AppRoutes>>;

// Base router context interface
export interface RouterContext {
  queryClient: QueryClient;
  isAuthenticated: boolean;
  role: string;
  isAdmin: boolean;
  isLoading: boolean;
}
