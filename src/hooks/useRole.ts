
import { useState, useEffect } from 'react';

// This would normally come from your auth system
type UserRole = 'admin' | 'user' | 'guest';

export function useRole() {
  // In a real app, this would be fetched from your auth system
  const [role, setRole] = useState<UserRole>('guest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock authentication check - in a real app, this would check the user's session
    const checkAuth = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes, randomly assign admin role 20% of the time
      // In a real app, this would be determined by your auth system
      const mockRole: UserRole = Math.random() < 0.2 ? 'admin' : 'user';
      setRole(mockRole);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const isAdmin = role === 'admin';
  const isUser = role === 'user' || role === 'admin'; // Admins have user privileges too
  const isGuest = role === 'guest';

  return {
    role,
    isAdmin,
    isUser,
    isGuest,
    isLoading,
    // For testing/demo purposes only - in a real app you wouldn't expose this
    setRole
  };
}
