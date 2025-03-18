
// Import all routes
import { Route as rootRoute } from './routes/__root';
import { Route as indexRoute } from './routes/index';
import { Route as notFoundRoute } from './routes/not-found';
import { Route as adminDashboardRoute } from './routes/admin/dashboard';
import { Route as userOverviewRoute } from './routes/user/overview';

// Create the route tree using proper typing
export const routeTree = rootRoute.addChildren([
  indexRoute,
  adminDashboardRoute,
  userOverviewRoute,
  notFoundRoute,
]);
