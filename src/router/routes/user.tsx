
import { Route } from '@tanstack/router';
import { layoutRoute } from './root';
import UserOverview from '@/pages/user/Overview';

export const userOverviewRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: '/user/overview',
  component: UserOverview,
});

export const userRoutes = [
  userOverviewRoute,
];
