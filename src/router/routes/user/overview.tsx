
import { createFileRoute } from '@tanstack/react-router';
import UserOverview from '@/pages/user/Overview';

export const Route = createFileRoute('/user/overview')({
  component: UserOverview
});
