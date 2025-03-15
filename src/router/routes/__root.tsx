
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import RootLayout from '@/layouts/RootLayout';
import { useRole } from '@/hooks/useRole';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Create a properly typed context for our router
export interface RouterContext {
  queryClient: QueryClient;
  isAuthenticated: boolean;
  role: string;
  isAdmin: boolean;
  isLoading: boolean;
}

export const Route = createRootRoute<RouterContext>({
  component: RootComponent,
  // The loader enables us to provide the router context with the authentication state
  loader: ({ context }) => {
    return context;
  },
});

function RootComponent() {
  const { role, isAdmin, isLoading } = useRole();
  const { isAuthenticated } = useUserStore();
  
  // Effect to handle authentication state changes (can be expanded)
  useEffect(() => {
    // For demonstration purposes, log the auth state
    console.log('Auth state updated:', { isAuthenticated, role, isAdmin });
  }, [isAuthenticated, role, isAdmin]);

  return (
    <RootLayout.Base>
      <RootLayout.Main>
        <Outlet />
      </RootLayout.Main>
    </RootLayout.Base>
  );
}
