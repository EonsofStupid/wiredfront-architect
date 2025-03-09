
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

// Create a properly typed context for our router
export interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRoute<RouterContext>({
  component: () => <Outlet />
});
