
import { atom } from 'jotai';
import type { Notification } from '@/types';

export const notificationsAtom = atom<Notification[]>([]);
export const unreadNotificationsCountAtom = atom(
  (get) => get(notificationsAtom).filter(notification => !notification.read).length
);

// Actions
export const addNotificationAtom = atom(
  null,
  (get, set, notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
      read: false,
    };
    set(notificationsAtom, [...get(notificationsAtom), newNotification]);
  }
);

export const markNotificationAsReadAtom = atom(
  null,
  (get, set, id: string) => {
    set(notificationsAtom, 
      get(notificationsAtom).map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  }
);

export const clearAllNotificationsAtom = atom(
  null,
  (_, set) => {
    set(notificationsAtom, []);
  }
);
