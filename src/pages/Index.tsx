
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppTheme } from '@/components/providers/ThemeProvider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const { theme, activeTheme, themeVersion, themeStatus } = useAppTheme();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="glass-neo cyber-grid mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl cyber-text">WFPulse Dashboard</CardTitle>
              <CardDescription>Welcome to the WFPulse platform</CardDescription>
            </div>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Theme v{themeVersion || '1.0'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This is the homepage of the WiredFront application. From here, you can access all the features.
          </p>
          <Tabs defaultValue="theme">
            <TabsList className="glass mb-4">
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="user">User</TabsTrigger>
            </TabsList>
            
            <TabsContent value="theme">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2">Current Theme</h3>
                  <p className="mb-4 text-muted-foreground">
                    {activeTheme?.name || "WFPulse Default"} - {themeStatus || "Active"}
                  </p>
                  
                  <h4 className="font-medium mb-2">Theme Settings</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Mode:</span>
                      <span className="font-medium capitalize">{theme.mode}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Glass Level:</span>
                      <span className="font-medium capitalize">{theme.glassMorphismLevel}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Sidebar Style:</span>
                      <span className="font-medium capitalize">{theme.sidebarStyle}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Neon Color:</span>
                      <span className="font-medium capitalize">{theme.neonColor}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Accent:</span>
                      <span className="font-medium capitalize">{theme.accentColor}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Theme Preview</h3>
                  <div className="rounded-md overflow-hidden border">
                    <div className="cyber-grid p-4 h-32 flex items-center justify-center">
                      <div className="text-center">
                        <p className="cyber-text text-xl mb-2">Cyber Effect</p>
                        <p className="text-sm text-muted-foreground">Grid opacity: {theme.cssVars?.effects?.cyber?.gridOpacity || 'default'}</p>
                      </div>
                    </div>
                    <div className="glass-neo p-4 h-32 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xl mb-2">Glass Effect</p>
                        <p className="text-sm text-muted-foreground">Blur: {theme.cssVars?.effects?.glass?.blur || 'default'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="admin">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme Management</CardTitle>
                    <CardDescription>Configure system themes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage system themes, create new themes, and set defaults.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/admin/themes">
                      <Button className="w-full">Access Theme Manager</Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Configure user accounts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage user accounts, roles, and permissions.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/admin/users">
                      <Button className="w-full" variant="outline">Access User Manager</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="user">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>User Overview</CardTitle>
                    <CardDescription>View your account details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      View your account information, preferences, and settings.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/user/overview">
                      <Button className="w-full">View User Overview</Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>User Preferences</CardTitle>
                    <CardDescription>Configure your preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Update your theme preferences and application settings.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/user/preferences">
                      <Button className="w-full" variant="outline">Update Preferences</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
