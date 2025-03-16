
import { createFileRoute } from '@tanstack/react-router';
import UserOverview from '@/pages/user/Overview';
import { toast } from '@/components/ui/use-toast';
import { RouterContext } from '@/types/router';

export const Route = createFileRoute('/user/overview')({
  component: UserOverview,
  validateSearch: (search: Record<string, unknown>) => ({
    tab: search.tab ? String(search.tab) : undefined
  }),
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
      
      throw context.queryClient.clear();
    }
    
    return {};
  }
});
