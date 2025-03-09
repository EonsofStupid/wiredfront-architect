
import { useEffect } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';

export function useSubscription(channel: RealtimeChannel) {
  useEffect(() => {
    // Channel is already subscribed from the caller
    
    return () => {
      // Unsubscribe when the component unmounts
      channel.unsubscribe();
    };
  }, [channel]);
}

export default useSubscription;
