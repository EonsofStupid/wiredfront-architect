
import { User } from '@/types';

export interface AdminStats {
  userCount: number;
  activeUsers: number;
  systemUptime: string;
  responseTime: string;
}

export interface RouterConfig {
  routes: {
    index: {
      path: '/';
      layout: 'main';
    };
    userOverview: {
      path: '/user/overview';
      layout: 'main';
      auth: true;
    };
    adminDashboard: {
      path: '/admin/dashboard';
      layout: 'main';
      auth: true;
      roles: ['admin'];
    };
  };
}

// These interfaces can be used for type checking within components
export interface RouteParams {
  index: Record<string, never>;
  userOverview: Record<string, never>;
  adminDashboard: Record<string, never>;
  notFound: Record<string, string>;
}

export interface RouteData {
  index: undefined;
  userOverview: { user?: User };
  adminDashboard: { stats?: AdminStats };
  notFound: undefined;
}

export interface SearchParams {
  index: Record<string, never>;
  userOverview: { tab?: string };
  adminDashboard: { view?: string };
  notFound: Record<string, never>;
}
