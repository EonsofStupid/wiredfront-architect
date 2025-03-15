
import { Outlet, createRootRoute } from '@tanstack/react-router';
import RootLayout from '@/layouts/RootLayout';
import { useRole } from '@/hooks/useRole';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect } from 'react';
import { RouterContext } from '@/router';

export const Route = createRootRoute({
  component: RootComponent,
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
