
import { createFileRoute } from '@tanstack/react-router';
import LandingPage from '@/pages/LandingPage';
import { RouterContext } from '@/types/router';

export const Route = createFileRoute('/')({
  component: LandingPage,
  validateSearch: (search: Record<string, unknown>) => ({}),
  beforeLoad: ({ context }: { context: RouterContext }) => {
    if (context.isAuthenticated && !context.isLoading) {
      throw context.queryClient.clear();
    }
    return {};
  }
});
