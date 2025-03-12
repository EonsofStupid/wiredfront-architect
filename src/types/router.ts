import { User } from '@/types';

export interface AdminStats {
  userCount: number;
  activeUsers: number;
  systemUptime: string;
  responseTime: string;
}

// Define route params for each route
export interface RouteParams {
  index: Record<string, never>;
  userOverview: Record<string, never>;
  adminDashboard: Record<string, never>;
  notFound: Record<string, string>;
}

// Define data structure for each route
export interface RouteData {
  index: undefined;
  userOverview: { user?: User };
  adminDashboard: { stats?: AdminStats };
  notFound: undefined;
}

// Define search params for each route
export interface SearchParams {
  index: Record<string, never>;
  userOverview: { tab?: string };
  adminDashboard: { view?: string };
  notFound: Record<string, never>;
}
