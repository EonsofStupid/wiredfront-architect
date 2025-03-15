
import React, { useEffect } from 'react';
import { Router, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree';
import { QueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { useRole } from '@/hooks/useRole';
import { useUserStore } from '@/stores/useUserStore';

// Create a default error component with better error handling
const DefaultErrorComponent = ({ error }: { error: Error }) => {
  console.error('Router error:', error);
  
  // Report to error tracking service if needed
  useEffect(() => {
    // Example: reportError(error);
    // For now, we'll just show a toast
    toast({
      variant: "destructive",
      title: "Navigation Error",
      description: error.message || 'An unexpected routing error occurred'
    });
  }, [error]);
  
  return (
    <div className="p-6 bg-destructive/20 rounded-lg shadow-lg max-w-3xl mx-auto my-12">
      <h1 className="text-2xl font-bold text-destructive mb-4">Navigation Error</h1>
      <p className="text-muted-foreground mb-4">{error.message || 'Unknown error'}</p>
      <div className="bg-background/50 p-4 rounded-md overflow-auto">
        <pre className="text-sm">
          {error.stack || 'No stack trace available'}
        </pre>
      </div>
    </div>
  );
}

// Create the router instance with proper options
export const router = createRouter({
  routeTree,
  context: {
    queryClient: new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          retry: 1,
        },
      },
    }),
    // Default values, will be overridden in the App.tsx
    isAuthenticated: false,
    role: 'guest',
    isAdmin: false,
    isLoading: true
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
