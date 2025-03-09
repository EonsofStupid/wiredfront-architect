
import { QueryClient } from '@tanstack/react-query';
import { Router, createRouter } from '@tanstack/react-router';

// Import the route tree
import { routeTree } from './routeTree';

// Create a new query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Create the router instance
export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  // Enable prefetching on intent to improve performance
  defaultPreloadDelay: 100,
});

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
