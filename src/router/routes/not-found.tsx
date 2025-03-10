
import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/pages/NotFound';
import { RouteParams, SearchParams } from '@/types/router';

export const Route = createFileRoute('/*')<{
  params: RouteParams['notFound'];
  search: SearchParams['notFound'];
}>({
  component: NotFound
});
