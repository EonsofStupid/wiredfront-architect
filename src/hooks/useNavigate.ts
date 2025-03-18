
import { Link, useRouter } from '@tanstack/react-router';
import { type AppRoutes, type RoutePath, type SearchParams } from '@/types/router';

export function useNavigate() {
  const router = useRouter();

  return {
    to: <TPath extends AppRoutes>(
      to: TPath, 
      options?: { search?: SearchParams[TPath] }
    ) => {
      router.navigate({
        to,
        search: options?.search
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
    
    // Export Link for consistent usage
    Link
  };
}

// Create a type-safe Link component wrapper
export function NavLink<TPath extends AppRoutes>({
  to,
  search,
  ...props
}: {
  to: TPath;
  search?: SearchParams[TPath];
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  return (
    <Link
      to={to}
      search={search}
      {...props}
    />
  );
}
