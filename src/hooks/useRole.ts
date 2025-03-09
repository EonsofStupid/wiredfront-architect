
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type UserRole = 'user' | 'admin' | 'super_admin' | 'developer' | 'subscriber' | 'guest';

export function useRole() {
  const [role, setRole] = useState<UserRole>('guest');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setRole('guest');
          setIsAdmin(false);
          return;
        }
        
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Error fetching user role:', error);
          setRole('guest');
          setIsAdmin(false);
          return;
        }
        
        const userRole = data.role as UserRole;
        setRole(userRole);
        setIsAdmin(['admin', 'super_admin'].includes(userRole));
      } catch (error) {
        console.error('Error checking user role:', error);
        setRole('guest');
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserRole();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchUserRole();
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { role, isAdmin, loading };
}
