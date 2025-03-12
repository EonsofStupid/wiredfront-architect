
import { Route as RootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as NotFoundRoute } from './routes/not-found'
import { Route as AdminDashboardRoute } from './routes/admin/dashboard'
import { Route as UserOverviewRoute } from './routes/user/overview'

export const routeTree = RootRoute.addChildren([
  IndexRoute,
  NotFoundRoute,
  AdminDashboardRoute,
  UserOverviewRoute,
])
