
import { createFileRoute } from '@tanstack/react-router';
import UserOverview from '@/pages/user/Overview';
import { toast } from '@/components/ui/use-toast';
import { RouterContext } from '@/router';

export const Route = createFileRoute('/user/overview')({
  component: UserOverview,
  // Protect this route - require authentication
  beforeLoad: ({ context }: { context: RouterContext }) => {
    // Skip if still loading auth state
    if (context.isLoading) {
      return {};
    }
    
    // Check if user is authenticated
    if (!context.isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to access this page",
        variant: "destructive"
      });
      
      throw context.router.navigate({
        to: '/',
        search: {
          // Optional: Add a redirect param to return after login
          redirect: '/user/overview'
        }
      });
    }
    
    return {};
  }
});
