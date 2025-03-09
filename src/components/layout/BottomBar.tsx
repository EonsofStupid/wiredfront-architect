
import { Terminal, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_VERSION } from '@/constants';
import { useAtomValue } from 'jotai';
import { glassMorphismLevelAtom, neonColorAtom } from '@/atoms';

const BottomBar = () => {
  const glassMorphismLevel = useAtomValue(glassMorphismLevelAtom);
  const neonColor = useAtomValue(neonColorAtom);

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
    <footer className={cn(
      "w-full h-8 bg-bottombar text-bottombar-foreground flex items-center justify-between px-4 border-t border-white/10 text-xs",
      getGlassMorphismClass(),
      "apple-glass cyber-background-animation" // Added Apple-inspired depth and animations
    )}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center hover-random-effect px-2 py-0.5 rounded">
          <CheckCircle size={12} className={cn(
            "mr-1",
            glassMorphismLevel === 'cyber' ? "text-neon-green" : "text-green-400"
          )} />
          <span className={glassMorphismLevel === 'cyber' ? getNeonTextClass() : ""}>Ready</span>
        </div>
        <div className="flex items-center hover-random-effect px-2 py-0.5 rounded">
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
