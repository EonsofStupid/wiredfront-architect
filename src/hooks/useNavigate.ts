
import { useRouter, Link } from '@tanstack/react-router';
import { RoutePath, SearchParams } from '@/types/router';

export function useNavigate() {
  const router = useRouter();

  return {
    to: <TTo extends RoutePath>(path: TTo, options?: { search?: Partial<SearchParams[TTo]> }) => {
      router.navigate({
        to: path,
        search: options?.search || {}
      });
    },
    
    back: () => {
      router.history.back();
    },
    
    get currentPath() {
      return router.state.location.pathname as RoutePath;
    },
    
    isActive: (path: RoutePath) => {
      return router.state.location.pathname === path;
    },
    
    Link
  };
}
