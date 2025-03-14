
import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/pages/NotFound';
import MainLayout from '@/components/layout/MainLayout';

export const Route = createFileRoute('/*')({
  component: () => (
    <MainLayout>
      <NotFound />
    </MainLayout>
  )
});
