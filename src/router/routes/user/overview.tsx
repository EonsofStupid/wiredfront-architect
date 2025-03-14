
import { createFileRoute } from '@tanstack/react-router';
import UserOverview from '@/pages/user/Overview';
import MainLayout from '@/components/layout/MainLayout';

export const Route = createFileRoute('/user/overview')({
  component: () => (
    <MainLayout>
      <UserOverview />
    </MainLayout>
  )
});
