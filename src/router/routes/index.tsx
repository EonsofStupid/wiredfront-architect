
import { createFileRoute } from '@tanstack/react-router';
import LandingPage from '@/pages/LandingPage';
import RootLayout from '@/layouts/RootLayout';

export const Route = createFileRoute('/')({
  component: () => (
    <RootLayout.Main>
      <LandingPage />
    </RootLayout.Main>
  ),
});
