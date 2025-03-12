
import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';

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

// Create a default error component
const DefaultErrorComponent = ({ error }: { error: Error }) => {
  console.error('Router error:', error);
  return (
    <div className="p-4 bg-destructive/20 rounded-md">
      <h1 className="text-xl font-bold text-destructive">Something went wrong</h1>
      <p className="text-muted-foreground">{error.message || 'Unknown error'}</p>
    </div>
  );
};

// Create the router instance with proper options
export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadDelay: 100,
  defaultErrorComponent: DefaultErrorComponent,
});

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
