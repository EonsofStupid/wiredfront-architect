
import { createFileRoute } from '@tanstack/react-router';
import AdminDashboard from '@/pages/admin/Dashboard';
import MainLayout from '@/components/layout/MainLayout';
import { RouteParams, SearchParams } from '@/types/router';

export const Route = createFileRoute('/admin/dashboard')({
  component: () => (
    <MainLayout>
      <AdminDashboard />
    </MainLayout>
  )
});
