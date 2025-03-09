
import { Terminal, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_VERSION } from '@/constants';

const BottomBar = () => {
  return (
    <footer className="w-full h-8 bg-bottombar text-bottombar-foreground glassmorphism flex items-center justify-between px-4 border-t border-white/10 text-xs">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <CheckCircle size={12} className="text-green-400 mr-1" />
          <span>Ready</span>
        </div>
        <div className="flex items-center">
          <Terminal size={12} className="mr-1" />
          <span>Terminal</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-bottombar-foreground/70">{APP_VERSION}</span>
      </div>
    </footer>
  );
};

export default BottomBar;
