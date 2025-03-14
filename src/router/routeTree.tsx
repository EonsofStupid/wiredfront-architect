
import { routeTree as baseRouteTree } from '@tanstack/react-router'

import { Route as rootRoute } from './routes/__root'
import { Route as indexRoute } from './routes/index'
import { Route as notFoundRoute } from './routes/not-found'
import { Route as adminDashboardRoute } from './routes/admin/dashboard'
import { Route as userOverviewRoute } from './routes/user/overview'

export const routeTree = rootRoute.addChildren([
  indexRoute,
  notFoundRoute,
  adminDashboardRoute,
  userOverviewRoute,
])
