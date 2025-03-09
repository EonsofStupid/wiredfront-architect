
import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { useTheme } from '@/hooks';
import { cn } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import { glassMorphismLevelAtom } from '@/atoms';

export function UserThemeToggle() {
  const { userThemeMode, setUserPreference } = useTheme();
  const glassMorphismLevel = useAtomValue(glassMorphismLevelAtom);

  const getButtonClass = () => {
    if (glassMorphismLevel === 'cyber') {
      return "cyber-button h-8 w-8 p-0";
    }
    return "h-8 w-8";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={cn(getButtonClass())}>
          {userThemeMode === 'light' ? <Sun className="h-4 w-4" /> : 
           userThemeMode === 'dark' ? <Moon className="h-4 w-4" /> : 
           <Monitor className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={glassMorphismLevel === 'cyber' ? "cyber-panel" : "glass-neo"}>
        <DropdownMenuItem onClick={() => setUserPreference('light')} className={glassMorphismLevel === 'cyber' ? "hover:bg-white/10" : ""}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserPreference('dark')} className={glassMorphismLevel === 'cyber' ? "hover:bg-white/10" : ""}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserPreference('system')} className={glassMorphismLevel === 'cyber' ? "hover:bg-white/10" : ""}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
