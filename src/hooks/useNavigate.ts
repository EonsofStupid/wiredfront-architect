
import { useRouter } from '@tanstack/react-router';

/**
 * A utility hook for easier navigation in the app
 */
export function useNavigate() {
  const router = useRouter();

  return {
    /**
     * Navigate to the given path
     */
    to: (path: string, options?: { search?: Record<string, any> }) => {
      router.navigate({
        to: path as any,
        search: options?.search
      });
    },
    
    /**
     * Navigate back in history
     */
    back: () => {
      router.history.back();
    },
    
    /**
     * Get the current pathname
     */
    get currentPath() {
      return router.state.location.pathname;
    },
    
    /**
     * Check if the current path matches the given path
     */
    isActive: (path: string) => {
      return router.state.location.pathname === path;
    }
  };
}
