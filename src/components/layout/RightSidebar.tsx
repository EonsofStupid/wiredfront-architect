
import { Info, Users, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import { glassMorphismLevelAtom, neonColorAtom, sidebarStyleAtom } from '@/atoms';

interface RightSidebarProps {
  visible: boolean;
}

const RightSidebar = ({ visible }: RightSidebarProps) => {
  const glassMorphismLevel = useAtomValue(glassMorphismLevelAtom);
  const neonColor = useAtomValue(neonColorAtom);
  const sidebarStyle = useAtomValue(sidebarStyleAtom);

  // Get the appropriate glass morphism class
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

  // Add background pattern based on sidebar style
  const getBackgroundPattern = () => {
    switch (sidebarStyle) {
      case 'circuit':
        return "circuit-bg";
      case 'matrix':
        return "matrix-bg";
      case 'solid':
        return "bg-rightbar";
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

  return (
    <aside 
      className={cn(
        "h-full bg-rightbar text-rightbar-foreground border-l border-sidebar-border transition-all duration-300 ease-in-out",
        getGlassMorphismClass(),
        getBackgroundPattern(),
        visible ? "w-80" : "w-0 overflow-hidden",
        "apple-glass cyber-background-animation" // Added Apple-inspired depth and animations
      )}
    >
      {visible && (
        <div className="h-full flex flex-col">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <h3 className={cn(
              "font-medium",
              glassMorphismLevel === 'cyber' && "neon-text"
            )}>Project Info</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto cyber-scrollbar p-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-rightbar-foreground/70">
                  <Info size={14} className="mr-2" /> Project Overview
                </div>
                <div className={cn(
                  "bg-white/5 rounded-lg p-3 hover-random-effect transition-all duration-300",
                  glassMorphismLevel === 'cyber' && getNeonBorderClass()
                )}>
                  <h4 className="font-medium text-sm mb-1">WiredFRONT</h4>
                  <p className="text-xs text-rightbar-foreground/70">
                    AI-assisted development platform designed for serious users who want to efficiently build applications while learning to code.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-rightbar-foreground/70">
                  <Users size={14} className="mr-2" /> Team
                </div>
                <div className={cn(
                  "bg-white/5 rounded-lg p-3 hover-random-effect transition-all duration-300",
                  glassMorphismLevel === 'cyber' && getNeonBorderClass()
                )}>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-cyberpunk-purple flex items-center justify-center text-xs text-white">A</div>
                    <div className="ml-2">
                      <div className="text-xs font-medium">Admin User</div>
                      <div className="text-[10px] text-rightbar-foreground/70">Owner</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-rightbar-foreground/70">
                  <FileText size={14} className="mr-2" /> Documentation
                </div>
                <div className={cn(
                  "bg-white/5 rounded-lg p-3 text-xs hover-random-effect transition-all duration-300",
                  glassMorphismLevel === 'cyber' && getNeonBorderClass()
                )}>
                  <div className="flex items-center justify-between">
                    <span>README.md</span>
                    <span className="text-accent text-[10px]">View</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-rightbar-foreground/70">
                  <Settings size={14} className="mr-2" /> Configuration
                </div>
                <div className={cn(
                  "bg-white/5 rounded-lg p-3 text-xs hover-random-effect transition-all duration-300",
                  glassMorphismLevel === 'cyber' && getNeonBorderClass()
                )}>
                  <div className="flex items-center justify-between">
                    <span>Project Settings</span>
                    <span className="text-accent text-[10px]">Edit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default RightSidebar;
