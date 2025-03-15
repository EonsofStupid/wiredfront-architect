
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import RootLayout from '@/layouts/RootLayout';

// Create a properly typed context for our router
export interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRoute<RouterContext>({
  component: () => (
    <RootLayout.Base>
      <RootLayout.Main>
        <Outlet />
      </RootLayout.Main>
    </RootLayout.Base>
  )
});
