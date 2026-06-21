import { createBrowserRouter } from 'react-router'
import Analytics from '../features/analytics/pages/Analytics.jsx'
import Login from '../features/auth/pages/Login.jsx'
import Register from '../features/auth/pages/Register.jsx'
import Dashboard from '../features/dashboard/pages/Dashboard.jsx'
import Home from '../features/home/pages/Home.jsx'
import Trash from '../features/trash/pages/Trash.jsx'
import ClaimUsername from '../features/username/pages/ClaimUsername.jsx'
import PagePlaceholder from '../shared/components/PagePlaceholder.jsx'
import ProtectedRoute from '../shared/components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PagePlaceholder
        title="Linktree"
        description="Frontend foundation is ready. Start with login or open a public profile."
      />
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/links/:linkId/analytics',
    element: (
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/trash',
    element: (
      <ProtectedRoute>
        <Trash />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings/username',
    element: (
      <ProtectedRoute>
        <ClaimUsername />
      </ProtectedRoute>
    ),
  },
  {
    path: '/:username',
    element: <Home />,
  },
  {
    path: '*',
    element: (
      <PagePlaceholder
        title="Page not found"
        description="The page you requested does not exist."
      />
    ),
  },
])

export default router
