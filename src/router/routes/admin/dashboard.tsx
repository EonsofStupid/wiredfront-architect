
import { createFileRoute } from '@tanstack/react-router';
import AdminDashboard from '@/pages/admin/Dashboard';

export const adminDashboardRoute = createFileRoute('/admin/dashboard')({
  component: AdminDashboard,
});
