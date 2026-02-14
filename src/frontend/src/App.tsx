import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import WorkspaceDetailsPage from './pages/WorkspaceDetailsPage';
import MyListingsPage from './pages/MyListingsPage';
import AddListingPage from './pages/AddListingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import ProfilePage from './pages/ProfilePage';
import AppShell from './components/layout/AppShell';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const workspaceDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/workspace/$workspaceId',
  component: WorkspaceDetailsPage,
});

const myListingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-listings',
  component: MyListingsPage,
});

const addListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/add-listing',
  component: AddListingPage,
});

const myBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-bookings',
  component: MyBookingsPage,
});

const bookingDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking/$bookingIndex',
  component: BookingDetailsPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
});

// Create router
const routeTree = rootRoute.addChildren([
  indexRoute,
  workspaceDetailsRoute,
  myListingsRoute,
  addListingRoute,
  myBookingsRoute,
  bookingDetailsRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
