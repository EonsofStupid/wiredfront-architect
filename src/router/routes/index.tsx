
import { createFileRoute } from '@tanstack/react-router';
import LandingPage from '@/pages/LandingPage';
import { RouterContext } from '@/router';

export const Route = createFileRoute('/')({
  component: LandingPage,
  // Optional: Redirect authenticated users
  beforeLoad: ({ context }: { context: RouterContext }) => {
    // Uncomment to redirect already authenticated users
    // if (context.isAuthenticated && !context.isLoading) {
    //   throw context.router.navigate({
    //     to: context.isAdmin ? '/admin/dashboard' : '/user/overview'
    //   });
    // }
    return {};
  }
});
