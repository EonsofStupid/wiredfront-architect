
import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/pages/NotFound';
import RootLayout from '@/layouts/RootLayout';

export const Route = createFileRoute('/*')({
  component: () => (
    <RootLayout.Main>
      <NotFound />
    </RootLayout.Main>
  )
});
