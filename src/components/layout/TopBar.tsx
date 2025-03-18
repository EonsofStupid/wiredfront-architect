import { Menu, PanelRightClose, PanelRightOpen, Settings, Bell, Search, User, ChevronDown, LogOut, LayoutDashboard, UserCog } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import { glassMorphismLevelAtom, neonColorAtom } from '@/atoms';
import { UserThemeToggle } from '@/components/ui/user-theme-toggle';
import { useRole } from '@/hooks';
import { NavLink, useNavigate } from '@/hooks/useNavigate';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  onMenuClick: () => void;
  onRightPanelClick: () => void;
  rightSidebarVisible: boolean;
}

const TopBar = ({ onMenuClick, onRightPanelClick, rightSidebarVisible }: TopBarProps) => {
  const glassMorphismLevel = useAtomValue(glassMorphismLevelAtom);
  const neonColor = useAtomValue(neonColorAtom);
  const { isAdmin, role } = useRole();
  const navigate = useNavigate();

  const getGlassMorphismClass = () => {
    switch (glassMorphismLevel) {
      case 'cyber':
        return "cyber-glassmorphism";
      case 'enhanced':
        return "enhanced-glassmorphism";
      default:
        return "glassmorphism";
    }
  };

  const getNeonTextClass = () => {
    switch (neonColor) {
      case 'purple':
        return "neon-text-purple";
      case 'green':
        return "neon-text-green";
      case 'blue':
      default:
        return "neon-text";
    }
  };
  
  return (
    <header className={cn(
      "w-full h-14 bg-topbar text-topbar-foreground z-50 flex items-center justify-between px-4",
      getGlassMorphismClass(),
      "cyber-background-animation"
    )}>
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-white/10 transition-colors hover-random-effect"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <NavLink 
          to="/"
          className={cn(
            "text-xl font-semibold",
            glassMorphismLevel === 'cyber' ? getNeonTextClass() : "text-gradient"
          )}
        >
          WiredFRONT
        </NavLink>
      </div>
      
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-topbar-foreground/60" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className={cn(
              "w-full bg-white/5 border rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary",
              glassMorphismLevel === 'cyber' ? "border-white/20 neon-border" : "border-white/10"
            )}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <UserThemeToggle />
        <button className={cn(
          "p-2 rounded-full hover:bg-white/10 transition-colors hover-random-effect",
          glassMorphismLevel === 'cyber' && "neon-border"
        )}>
          <Bell size={20} />
        </button>
        <button className={cn(
          "p-2 rounded-full hover:bg-white/10 transition-colors hover-random-effect",
          glassMorphismLevel === 'cyber' && "neon-border"
        )}>
          <Settings size={20} />
          {isAdmin && <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />}
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(
            "flex items-center space-x-1 p-1 rounded-full hover:bg-white/10 transition-colors hover-random-effect",
            glassMorphismLevel === 'cyber' && "neon-border"
          )}>
            <div className="w-8 h-8 rounded-full bg-gradient-cyberpunk flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <ChevronDown size={14} className="text-white/70" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="cyber-glassmorphism border-white/10 min-w-[200px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem 
              className="hover-random-effect"
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "Profile page will be available in a future update.",
                });
              }}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover-random-effect"
              onClick={() => {
                navigate.to('/user/overview');
              }}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Overview</span>
            </DropdownMenuItem>
            
            {isAdmin && (
              <>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuLabel>Administration</DropdownMenuLabel>
                <DropdownMenuItem 
                  className="hover-random-effect"
                  onClick={() => {
                    navigate.to('/admin/dashboard');
                  }}
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Admin Dashboard</span>
                </DropdownMenuItem>
              </>
            )}
            
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="hover-random-effect">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button 
          onClick={onRightPanelClick}
          className={cn(
            "p-2 rounded-full hover:bg-white/10 transition-colors hover-random-effect",
            glassMorphismLevel === 'cyber' && "neon-border"
          )}
          aria-label={rightSidebarVisible ? "Hide panel" : "Show panel"}
        >
          {rightSidebarVisible ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
