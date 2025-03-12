
import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/pages/NotFound';
import { RouteParams, SearchParams } from '@/types/router';

export const Route = createFileRoute('/*')({
  component: NotFound
});
