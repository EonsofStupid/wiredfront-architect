
import { createFileRoute } from '@tanstack/react-router';
import AdminDashboard from '@/pages/admin/Dashboard';
import { toast } from '@/components/ui/use-toast';
import { RouterContext } from '@/types/router';

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminDashboard,
  validateSearch: (search: Record<string, unknown>) => ({
    view: search.view ? String(search.view) : undefined
  }),
  beforeLoad: ({ context }: { context: RouterContext }) => {
    if (context.isLoading) {
      return {};
    }
    
    if (!context.isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to access the admin dashboard",
        variant: "destructive"
      });
      
      throw context.queryClient.clear();
    }
    
    if (!context.isAdmin) {
      toast({
        title: "Access denied",
        description: "You don't have permission to access the admin dashboard",
        variant: "destructive"
      });
      
      throw context.queryClient.clear();
    }
    
    return {};
  }
});
