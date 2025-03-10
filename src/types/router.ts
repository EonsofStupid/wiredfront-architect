
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

// Route types for type assertions
export type IndexRouteType = ReturnType<typeof import('../router/routes/index').Route>;
export type UserOverviewRouteType = ReturnType<typeof import('../router/routes/user/overview').Route>;
export type AdminDashboardRouteType = ReturnType<typeof import('../router/routes/admin/dashboard').Route>;
export type NotFoundRouteType = ReturnType<typeof import('../router/routes/not-found').Route>;
