
import { RootRoute } from '@tanstack/react-router'
import { Route as IndexRoute } from './routes/index'
import { Route as NotFoundRoute } from './routes/not-found'
import { Route as AdminDashboardRoute } from './routes/admin/dashboard'
import { Route as UserOverviewRoute } from './routes/user/overview'
import { QueryClient } from '@tanstack/react-query'

// Create a properly typed context for our router
export interface RouterContext {
  queryClient: QueryClient;
}

// Create the root route
export const rootRoute = new RootRoute<RouterContext>({
  component: ({ children }) => (
    <div className="app-container">
      {children}
    </div>
  )
})

// Build the route tree using the root route
export const routeTree = rootRoute.addChildren([
  IndexRoute,
  NotFoundRoute,
  AdminDashboardRoute,
  UserOverviewRoute,
])
