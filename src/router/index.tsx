
import { createRouter } from '@tanstack/react-router';

// Import the route tree
import { routeTree } from './routeTree';

// We'll use the queryClient from App.tsx

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
    // We'll provide this from App.tsx
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
