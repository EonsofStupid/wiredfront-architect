
import { Home, Layers, Code, Image, MessageCircle, FileText, PlusCircle, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import { sidebarStyleAtom, neonColorAtom, glassMorphismLevelAtom } from '@/atoms';
import { NavLink, useNavigate } from '@/hooks/useNavigate';
import { useRouter } from '@tanstack/react-router';
import { type AppRoutes } from '@/types/router';

interface LeftSidebarProps {
  collapsed: boolean;
}

const LeftSidebar = ({ collapsed }: LeftSidebarProps) => {
  const sidebarStyle = useAtomValue(sidebarStyleAtom);
  const neonColor = useAtomValue(neonColorAtom);
  const glassMorphismLevel = useAtomValue(glassMorphismLevelAtom);
  
  const router = useRouter();
  
  // Get current route to determine which nav item is active
  const pathname = router.state.location.pathname;
  
  const sidebarItems: {
    icon: React.ElementType;
    label: string;
    path: AppRoutes;
    active: boolean;
  }[] = [
    { icon: Home, label: 'Dashboard', path: '/', active: pathname === '/' },
    { icon: User, label: 'User Overview', path: '/user/overview', active: pathname === '/user/overview' },
    { icon: Settings, label: 'Admin Dashboard', path: '/admin/dashboard', active: pathname === '/admin/dashboard' }
  ];

  const getSidebarClass = () => {
    const baseClasses = "bg-sidebar text-sidebar-foreground h-full border-r border-sidebar-border transition-all duration-300 ease-in-out cyber-background-animation";

    // Glass morphism style variations
    if (glassMorphismLevel === 'cyber') {
      return cn(baseClasses, "cyber-glassmorphism");
    } else if (glassMorphismLevel === 'enhanced') {
      return cn(baseClasses, "enhanced-glassmorphism");
    } else {
      return cn(baseClasses, "glassmorphism");
    }
  };

  // Add background pattern based on sidebar style
  const getBackgroundPattern = () => {
    switch (sidebarStyle) {
      case 'circuit':
        return "circuit-bg";
      case 'matrix':
        return "matrix-bg";
      case 'solid':
        return "bg-sidebar";
      case 'glass':
      default:
        return "";
    }
  };

  // Get neon border class based on selected neon color
  const getNeonBorderClass = () => {
    switch (neonColor) {
      case 'purple':
        return "neon-border-pink";
      case 'green':
        return "neon-border-green";
      case 'blue':
      default:
        return "neon-border";
    }
  };

  // Get neon text class based on selected neon color
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
    <aside 
      className={cn(
        getSidebarClass(),
        getBackgroundPattern(),
        collapsed ? "w-16" : "w-64",
        "apple-glass" // Added Apple-inspired depth
      )}
    >
      <div className="h-full flex flex-col py-4">
        <div className="flex-1 overflow-y-auto cyber-scrollbar">
          <nav className="px-2 space-y-2">
            {sidebarItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={cn(
                  "w-full flex items-center rounded-lg py-2 px-3 transition-colors",
                  "hover:bg-sidebar-accent group relative overflow-hidden hover-random-effect",
                  item.active ? "bg-sidebar-accent" : "text-sidebar-foreground"
                )}
              >
                <item.icon 
                  size={20} 
                  className={cn(
                    item.active ? "text-accent" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground",
                    item.active && getNeonTextClass()
                  )} 
                />
                {!collapsed && (
                  <span className={cn(
                    "ml-3 text-sm font-medium truncate",
                    item.active && getNeonTextClass()
                  )}>
                    {item.label}
                  </span>
                )}
                {item.active && (
                  <div className={cn(
                    "absolute left-0 w-1 h-8 bg-accent rounded-r-full",
                    getNeonBorderClass()
                  )}></div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="px-3 pt-4 mt-auto">
          <button
            className={cn(
              "w-full flex items-center justify-center rounded-lg py-2 px-3",
              "bg-sidebar-primary/10 hover:bg-sidebar-primary/20 transition-colors",
              "border border-sidebar-primary/20 enhanced-glowing-border hover-random-effect"
            )}
          >
            <PlusCircle size={18} className="text-sidebar-primary" />
            {!collapsed && (
              <span className="ml-2 text-sm font-medium">New Project</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
