
import { createFileRoute } from '@tanstack/react-router';
import LandingPage from '@/pages/LandingPage';
import MainLayout from '@/components/layout/MainLayout';

export const Route = createFileRoute('/')({
  component: () => (
    <MainLayout>
      <LandingPage />
    </MainLayout>
  ),
});
