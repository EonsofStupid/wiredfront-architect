
import { Route as rootRoute } from './routes/__root';
import { Route as indexRoute } from './routes/index';
import { Route as notFoundRoute } from './routes/not-found';
import { Route as adminDashboardRoute } from './routes/admin/dashboard';
import { Route as userOverviewRoute } from './routes/user/overview';

// Organize routes by categories
const publicRoutes = [
  indexRoute,
];

const protectedRoutes = [
  userOverviewRoute,
];

const adminRoutes = [
  adminDashboardRoute,
];

const utilityRoutes = [
  notFoundRoute,
];

// Export the complete route tree
export const routeTree = rootRoute.addChildren([
  ...publicRoutes,
  ...protectedRoutes,
  ...adminRoutes,
  ...utilityRoutes,
]);
