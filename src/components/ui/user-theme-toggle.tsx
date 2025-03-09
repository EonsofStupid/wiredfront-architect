
import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { useTheme } from '@/hooks';

export function UserThemeToggle() {
  const { userThemeMode, setUserPreference } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          {userThemeMode === 'light' ? <Sun className="h-4 w-4" /> : 
           userThemeMode === 'dark' ? <Moon className="h-4 w-4" /> : 
           <Monitor className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setUserPreference('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserPreference('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserPreference('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
