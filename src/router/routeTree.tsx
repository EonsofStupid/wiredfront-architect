
import { Route as rootRoute } from './routes/__root';

// Import file-based routes
import { Route as indexRoute } from './routes/index';
import { Route as userOverviewRoute } from './routes/user/overview';
import { Route as adminDashboardRoute } from './routes/admin/dashboard';
import { Route as notFoundRoute } from './routes/not-found';

// Import types for route assertion
import { 
  IndexRouteType,
  UserOverviewRouteType,
  AdminDashboardRouteType,
  NotFoundRouteType
} from '@/types/router';

// Create the route tree with proper typing
export const routeTree = rootRoute.addChildren([
  indexRoute as IndexRouteType,
  userOverviewRoute as UserOverviewRouteType,
  adminDashboardRoute as AdminDashboardRouteType,
  notFoundRoute as NotFoundRouteType
]);
