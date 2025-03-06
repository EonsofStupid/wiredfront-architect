
import { Home, Layers, Code, Image, MessageCircle, FileText, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeftSidebarProps {
  collapsed: boolean;
}

const LeftSidebar = ({ collapsed }: LeftSidebarProps) => {
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Code, label: 'Developer' },
    { icon: MessageCircle, label: 'AI Chat' },
    { icon: Layers, label: 'Projects' },
    { icon: Image, label: 'Gallery' },
    { icon: FileText, label: 'Documents' },
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar text-sidebar-foreground h-full glassmorphism",
        "border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-full flex flex-col py-4">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <nav className="px-2 space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "w-full flex items-center rounded-lg py-2 px-3 transition-colors",
                  "hover:bg-sidebar-accent group",
                  item.active ? "bg-sidebar-accent text-accent" : "text-sidebar-foreground"
                )}
              >
                <item.icon size={20} className={item.active ? "text-accent" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"} />
                {!collapsed && (
                  <span className="ml-3 text-sm font-medium truncate">{item.label}</span>
                )}
                {item.active && !collapsed && (
                  <div className="absolute left-0 w-1 h-8 bg-accent rounded-r-full"></div>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="px-3 pt-4 mt-auto">
          <button
            className={cn(
              "w-full flex items-center justify-center rounded-lg py-2 px-3",
              "bg-sidebar-primary/10 hover:bg-sidebar-primary/20 transition-colors",
              "border border-sidebar-primary/20 glowing-border"
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
