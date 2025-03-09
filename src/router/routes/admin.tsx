
import { Route } from '@tanstack/router';
import { layoutRoute } from './root';
import AdminDashboard from '@/pages/admin/Dashboard';

export const adminDashboardRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: '/admin/dashboard',
  component: AdminDashboard,
});

export const adminRoutes = [
  adminDashboardRoute,
];
