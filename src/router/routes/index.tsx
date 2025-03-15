
import { createFileRoute, redirect } from '@tanstack/react-router';
import LandingPage from '@/pages/LandingPage';

export const Route = createFileRoute('/')({
  component: LandingPage,
  // Optionally redirect authenticated users to their dashboard
  beforeLoad: ({ context }) => {
    // Uncomment to redirect already authenticated users
    // if (context.isAuthenticated && !context.isLoading) {
    //   return redirect({
    //     to: context.isAdmin ? '/admin/dashboard' : '/user/overview'
    //   });
    // }
    return {};
  }
});
