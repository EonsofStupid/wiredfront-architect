
import { createRootRoute, Outlet } from '@tanstack/react-router';
import MainLayout from '@/components/layout/MainLayout';
import { QueryClient } from '@tanstack/react-query';

// Create a type for our router context
interface RouterContext {
  queryClient: QueryClient;
}

// Create the root route with proper context typing
export const rootRoute = createRootRoute<RouterContext>({
  component: () => <Outlet />,
});

// Create a layout route that will be the parent for all our main routes
export const layoutRoute = rootRoute.createRoute({
  id: 'layout',
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});
