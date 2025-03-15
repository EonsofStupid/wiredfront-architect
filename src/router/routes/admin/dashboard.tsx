
import { createFileRoute } from '@tanstack/react-router';
import AdminDashboard from '@/pages/admin/Dashboard';
import { toast } from '@/components/ui/use-toast';
import { RouterContext } from '@/router';

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminDashboard,
  // Protect this route - require admin role
  beforeLoad: ({ context }: { context: RouterContext }) => {
    // Skip if still loading auth state
    if (context.isLoading) {
      return {};
    }
    
    // First check if user is authenticated
    if (!context.isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to access the admin dashboard",
        variant: "destructive"
      });
      
      throw context.router.navigate({
        to: '/',
        search: {
          // Optional: Add a redirect param to return after login
          redirect: '/admin/dashboard'
        }
      });
    }
    
    // Then check if user has admin role
    if (!context.isAdmin) {
      toast({
        title: "Access denied",
        description: "You don't have permission to access the admin dashboard",
        variant: "destructive"
      });
      
      throw context.router.navigate({
        to: '/user/overview'
      });
    }
    
    return {};
  }
});
