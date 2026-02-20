import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import ResultsPage from './pages/ResultsPage';
import AdmitCardsPage from './pages/AdmitCardsPage';
import NewsPage from './pages/NewsPage';
import SchemesPage from './pages/SchemesPage';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/jobs',
  component: JobsPage,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/results',
  component: ResultsPage,
});

const admitCardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admit-cards',
  component: AdmitCardsPage,
});

const newsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/news',
  component: NewsPage,
});

const schemesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/schemes',
  component: SchemesPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  jobsRoute,
  resultsRoute,
  admitCardsRoute,
  newsRoute,
  schemesRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
