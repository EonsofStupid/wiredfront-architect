
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

// Create a type for our router context
export interface RouterContext {
  queryClient: QueryClient;
}

// Create the root route with proper context typing
export const Route = createRootRoute<RouterContext>({
  component: () => <Outlet />
});
