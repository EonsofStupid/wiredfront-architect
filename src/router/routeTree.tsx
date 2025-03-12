
import { Route as rootRoute } from './routes/__root';

// Import file-based routes
import { Route as indexRoute } from './routes/index';
import { Route as userOverviewRoute } from './routes/user/overview';
import { Route as adminDashboardRoute } from './routes/admin/dashboard';
import { Route as notFoundRoute } from './routes/not-found';

// Create the route tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  userOverviewRoute,
  adminDashboardRoute,
  notFoundRoute
]);
