
import { RootRoute, Route, Outlet } from '@tanstack/router';
import MainLayout from '@/components/layout/MainLayout';

export const rootRoute = new RootRoute({
  component: () => <Outlet />,
});

export const layoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});
