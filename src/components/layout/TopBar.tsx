
import { Menu, PanelRightClose, PanelRightOpen, Settings, Bell, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  onMenuClick: () => void;
  onRightPanelClick: () => void;
  rightSidebarVisible: boolean;
}

const TopBar = ({ onMenuClick, onRightPanelClick, rightSidebarVisible }: TopBarProps) => {
  return (
    <header className="w-full h-14 bg-topbar text-topbar-foreground glassmorphism z-50 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <div className="text-xl font-semibold text-gradient">WiredFRONT</div>
      </div>
      
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-topbar-foreground/60" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <Settings size={20} />
        </button>
        <button 
          onClick={onRightPanelClick}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label={rightSidebarVisible ? "Hide panel" : "Show panel"}
        >
          {rightSidebarVisible ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
