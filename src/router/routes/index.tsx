
import { Route } from '@tanstack/router';
import { rootRoute } from './root';
import LandingPage from '@/pages/LandingPage';

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});
