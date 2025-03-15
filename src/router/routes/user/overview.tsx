
import { createFileRoute } from '@tanstack/react-router';
import UserOverview from '@/pages/user/Overview';
import RootLayout from '@/layouts/RootLayout';

export const Route = createFileRoute('/user/overview')({
  component: () => (
    <RootLayout.Main>
      <UserOverview />
    </RootLayout.Main>
  )
});
