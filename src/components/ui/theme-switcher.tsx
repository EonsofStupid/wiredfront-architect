
import { useAtom } from 'jotai';
import { 
  glassMorphismLevelAtom, 
  sidebarStyleAtom, 
  neonColorAtom, 
  accentColorAtom 
} from '@/atoms';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const [glassMorphismLevel, setGlassMorphismLevel] = useAtom(glassMorphismLevelAtom);
  const [sidebarStyle, setSidebarStyle] = useAtom(sidebarStyleAtom);
  const [neonColor, setNeonColor] = useAtom(neonColorAtom);
  const [accentColor, setAccentColor] = useAtom(accentColorAtom);

  return (
    <div className="cyber-glassmorphism p-4 rounded-lg space-y-4">
      <h3 className="font-medium text-sm mb-2 neon-text">Theme Settings</h3>

      <div className="space-y-2">
        <label className="text-xs text-foreground/70">Glass Morphism Level</label>
        <div className="grid grid-cols-3 gap-2">
          {(['default', 'enhanced', 'cyber'] as const).map(level => (
            <button
              key={level}
              onClick={() => setGlassMorphismLevel(level)}
              className={cn(
                "px-3 py-1.5 rounded text-xs border border-white/10",
                glassMorphismLevel === level ? "bg-primary text-primary-foreground" : "bg-white/5"
              )}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-foreground/70">Sidebar Style</label>
        <div className="grid grid-cols-2 gap-2">
          {(['glass', 'solid', 'circuit', 'matrix'] as const).map(style => (
            <button
              key={style}
              onClick={() => setSidebarStyle(style)}
              className={cn(
                "px-3 py-1.5 rounded text-xs border border-white/10",
                sidebarStyle === style ? "bg-primary text-primary-foreground" : "bg-white/5"
              )}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-foreground/70">Neon Color</label>
        <div className="grid grid-cols-5 gap-2">
          {(['blue', 'purple', 'green', 'pink', 'yellow'] as const).map(color => (
            <button
              key={color}
              onClick={() => setNeonColor(color)}
              className={cn(
                "w-8 h-8 rounded-full border-2",
                neonColor === color ? "border-white" : "border-transparent",
                color === 'blue' && "bg-neon-blue",
                color === 'purple' && "bg-neon-purple",
                color === 'green' && "bg-neon-green",
                color === 'pink' && "bg-neon-pink",
                color === 'yellow' && "bg-neon-yellow"
              )}
              aria-label={`${color} theme`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-foreground/70">Accent Style</label>
        <div className="grid grid-cols-3 gap-2">
          {(['cyberpunk', 'toxic', 'neon'] as const).map(style => (
            <button
              key={style}
              onClick={() => setAccentColor(style)}
              className={cn(
                "px-3 py-1.5 rounded text-xs border border-white/10",
                accentColor === style ? "bg-primary text-primary-foreground" : "bg-white/5",
                style === 'cyberpunk' && "bg-gradient-cyberpunk",
                style === 'toxic' && "bg-gradient-toxic",
                style === 'neon' && "bg-gradient-neon",
                (style === 'toxic' || style === 'neon' || style === 'cyberpunk') && accentColor !== style && "bg-none"
              )}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
