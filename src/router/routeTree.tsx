
import { RootRoute } from '@tanstack/react-router';
import { rootRoute } from './routes/__root';
import { indexRoute } from './routes/index';
import { userOverviewRoute } from './routes/user/overview';
import { adminDashboardRoute } from './routes/admin/dashboard';
import { notFoundRoute } from './routes/not-found';

// Create our route tree using the latest API
const routeTree = rootRoute.addChildren([
  indexRoute,
  userOverviewRoute,
  adminDashboardRoute,
  notFoundRoute,
]);

export { routeTree };
