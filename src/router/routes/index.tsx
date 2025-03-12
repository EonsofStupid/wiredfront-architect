
import { createFileRoute } from '@tanstack/react-router';
import LandingPage from '@/pages/LandingPage';

export const Route = createFileRoute('/')({
  component: LandingPage
});
