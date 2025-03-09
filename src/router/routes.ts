
import { Route } from '@tanstack/router';
import { rootRoute, layoutRoute } from './routes/root';
import { indexRoute } from './routes/index';
import { userRoutes } from './routes/user';
import { adminRoutes } from './routes/admin';
import { notFoundRoute } from './routes/notFound';

export const routeTree = rootRoute.addChildren([
  indexRoute,
  layoutRoute.addChildren([
    ...userRoutes,
    ...adminRoutes,
  ]),
  notFoundRoute,
]);

export * from './routes/root';
export * from './routes/index';
export * from './routes/user';
export * from './routes/admin';
export * from './routes/notFound';
