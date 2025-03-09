
import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/pages/NotFound';

export const notFoundRoute = createFileRoute('/*')({
  component: NotFound,
});
