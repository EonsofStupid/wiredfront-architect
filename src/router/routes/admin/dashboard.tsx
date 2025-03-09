
import { createFileRoute } from '@tanstack/react-router';
import AdminDashboard from '@/pages/admin/Dashboard';
import MainLayout from '@/components/layout/MainLayout';

export const Route = createFileRoute('/admin/dashboard')({
  component: () => (
    <MainLayout>
      <AdminDashboard />
    </MainLayout>
  ),
});
