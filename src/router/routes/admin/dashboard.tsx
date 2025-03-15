
import { createFileRoute } from '@tanstack/react-router';
import AdminDashboard from '@/pages/admin/Dashboard';
import RootLayout from '@/layouts/RootLayout';

export const Route = createFileRoute('/admin/dashboard')({
  component: () => (
    <RootLayout.Main>
      <AdminDashboard />
    </RootLayout.Main>
  )
});
