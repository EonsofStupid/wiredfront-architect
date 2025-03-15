
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from 'jotai';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Update the router context with our query client
const routerWithContext = router.withContext({
  queryClient,
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <JotaiProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={routerWithContext} />
      </TooltipProvider>
    </JotaiProvider>
  </QueryClientProvider>
);

export default App;
