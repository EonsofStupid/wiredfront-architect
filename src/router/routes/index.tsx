
import { createFileRoute } from '@tanstack/react-router';
import LandingPage from '@/pages/LandingPage';
import { RouteParams, SearchParams } from '@/types/router';

export const Route = createFileRoute('/')<{
  params: RouteParams['index'];
  search: SearchParams['index'];
}>({
  component: LandingPage
});
