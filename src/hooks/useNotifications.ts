
import { useAtom } from 'jotai';
import { 
  notificationsAtom, 
  unreadNotificationsCountAtom, 
  addNotificationAtom, 
  markNotificationAsReadAtom, 
  clearAllNotificationsAtom 
} from '@/atoms';
import type { NotificationType } from '@/types';
import { useToast } from './use-toast';

export function useNotifications() {
  const [notifications] = useAtom(notificationsAtom);
  const [unreadCount] = useAtom(unreadNotificationsCountAtom);
  const [, addNotification] = useAtom(addNotificationAtom);
  const [, markAsRead] = useAtom(markNotificationAsReadAtom);
  const [, clearAll] = useAtom(clearAllNotificationsAtom);
  const { toast } = useToast();

  const notify = (
    title: string, 
    message: string, 
    type: NotificationType = 'info',
    showToast: boolean = true
  ) => {
    addNotification({ title, message, type });
    
    if (showToast) {
      toast({
        title,
        description: message,
        variant: type === 'error' ? 'destructive' : undefined,
      });
    }
  };

  return {
    notifications,
    unreadCount,
    notify,
    markAsRead,
    clearAll,
  };
}
