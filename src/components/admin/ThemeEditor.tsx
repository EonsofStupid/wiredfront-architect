
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks';
import { cn } from '@/lib/utils';

export function ThemeEditor() {
  const { 
    glassMorphismLevel, setGlassMorphismLevel,
    sidebarStyle, setSidebarStyle,
    neonColor, setNeonColor,
    accentColor, setAccentColor,
    isAdminEditMode, toggleAdminEditMode
  } = useTheme();

  // This would normally be gated behind an admin check
  if (!isAdminEditMode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Configure the application's appearance</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={toggleAdminEditMode}>Enter Edit Mode</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Theme Editor</CardTitle>
            <CardDescription>Customize the application's appearance</CardDescription>
          </div>
          <Button variant="outline" onClick={toggleAdminEditMode}>Exit Edit Mode</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Glass Effect</TabsTrigger>
            <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="accent">Accent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Glass Morphism Level</h3>
              <RadioGroup 
                value={glassMorphismLevel} 
                onValueChange={(value) => setGlassMorphismLevel(value as typeof glassMorphismLevel)}
                className="grid grid-cols-3 gap-4"
              >
                {(['default', 'enhanced', 'cyber'] as const).map((level) => (
                  <div key={level}>
                    <RadioGroupItem 
                      value={level} 
                      id={`glass-${level}`} 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor={`glass-${level}`}
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground",
                        "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                      )}
                    >
                      <span className="text-center capitalize">{level}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="sidebar" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Sidebar Style</h3>
              <RadioGroup 
                value={sidebarStyle} 
                onValueChange={(value) => setSidebarStyle(value as typeof sidebarStyle)}
                className="grid grid-cols-2 gap-4"
              >
                {(['glass', 'solid', 'circuit', 'matrix'] as const).map((style) => (
                  <div key={style}>
                    <RadioGroupItem 
                      value={style} 
                      id={`sidebar-${style}`} 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor={`sidebar-${style}`}
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground",
                        "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                      )}
                    >
                      <span className="text-center capitalize">{style}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="colors" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Neon Color</h3>
              <RadioGroup 
                value={neonColor} 
                onValueChange={(value) => setNeonColor(value as typeof neonColor)}
                className="grid grid-cols-5 gap-4"
              >
                {(['blue', 'purple', 'green', 'pink', 'yellow'] as const).map((color) => (
                  <div key={color}>
                    <RadioGroupItem 
                      value={color} 
                      id={`neon-${color}`} 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor={`neon-${color}`}
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground",
                        "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                        color === 'blue' && "bg-blue-500/20",
                        color === 'purple' && "bg-purple-500/20",
                        color === 'green' && "bg-green-500/20",
                        color === 'pink' && "bg-pink-500/20",
                        color === 'yellow' && "bg-yellow-500/20",
                      )}
                    >
                      <span className="text-center capitalize">{color}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="accent" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Accent Style</h3>
              <RadioGroup 
                value={accentColor} 
                onValueChange={(value) => setAccentColor(value as typeof accentColor)}
                className="grid grid-cols-3 gap-4"
              >
                {(['cyberpunk', 'toxic', 'neon'] as const).map((style) => (
                  <div key={style}>
                    <RadioGroupItem 
                      value={style} 
                      id={`accent-${style}`} 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor={`accent-${style}`}
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground",
                        "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                        style === 'cyberpunk' && "bg-gradient-to-r from-purple-500/30 to-pink-500/30",
                        style === 'toxic' && "bg-gradient-to-r from-green-500/30 to-yellow-500/30",
                        style === 'neon' && "bg-gradient-to-r from-blue-500/30 to-cyan-500/30",
                      )}
                    >
                      <span className="text-center capitalize">{style}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
