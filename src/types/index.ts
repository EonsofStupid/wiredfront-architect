
// Core application types
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'superadmin';
};

export type Project = {
  id: string;
  name: string;
  type: string;
  lastEdited: string;
  description?: string;
  thumbnail?: string;
  owner: string;
  collaborators?: string[];
};

export type AppTheme = 'dark' | 'system';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
};
