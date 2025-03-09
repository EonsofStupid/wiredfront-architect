
import { Outlet, createRootRoute } from '@tanstack/react-router';
import MainLayout from '@/components/layout/MainLayout';
import { QueryClient } from '@tanstack/react-query';

// Create a type for our router context
export interface RouterContext {
  queryClient: QueryClient;
}

// Create the root route with proper context typing
export const rootRoute = createRootRoute<RouterContext>({
  component: () => <Outlet />,
});
