
import { Router } from '@tanstack/router';
import { QueryClient } from '@tanstack/react-query';
import { routeTree } from './routes';

// Create the router instance
const queryClient = new QueryClient();

export const router = new Router({
  routeTree,
  defaultPreload: 'intent',
  context: {
    queryClient,
  },
});

// Register the router for type safety
declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
