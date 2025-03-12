
import { createFileRoute } from '@tanstack/react-router';
import UserOverview from '@/pages/user/Overview';
import MainLayout from '@/components/layout/MainLayout';
import { RouteParams, SearchParams } from '@/types/router';

export const Route = createFileRoute('/user/overview')({
  component: () => (
    <MainLayout>
      <UserOverview />
    </MainLayout>
  )
});
