
import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/pages/NotFound';

export const Route = createFileRoute('/*')({
  component: NotFound,
  validateSearch: (search: Record<string, unknown>) => ({}),
  // Optional logging for 404s
  beforeLoad: () => {
    console.warn('404 route accessed:', window.location.pathname);
    return {};
  }
});
