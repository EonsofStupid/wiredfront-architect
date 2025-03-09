
import { Route } from '@tanstack/router';
import { rootRoute } from './root';
import NotFound from '@/pages/NotFound';

export const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});
