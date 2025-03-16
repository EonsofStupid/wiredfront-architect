
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from 'jotai';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { type RouterContext } from './types/router';
import { useRole } from '@/hooks/useRole';
import { useUserStore } from '@/stores/useUserStore';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  // Get authentication state and role from our hooks
  const { role, isAdmin, isLoading } = useRole();
  const { isAuthenticated } = useUserStore();

  // Create a context object for the router
  const routerContext: RouterContext = {
    queryClient,
    isAuthenticated,
    role,
    isAdmin,
    isLoading
  };

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouterProvider router={router} context={routerContext} />
        </TooltipProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

export default App;
