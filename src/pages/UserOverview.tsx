
import React, { useEffect, useState } from 'react';
import { useAppTheme } from '@/components/providers/ThemeProvider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRole } from '@/hooks/useRole';
import { Theme } from '@/types/theme';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, User } from 'lucide-react';

const UserOverview: React.FC = () => {
  const { activeTheme, dynamicColors } = useAppTheme();
  const { role, isAdmin, loading: roleLoading } = useRole();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    // Set current theme from activeTheme
    setCurrentTheme(activeTheme);
  }, [activeTheme]);

  if (loading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 cyber-text">User Overview</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="glass mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="theme">Current Theme</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-neo cyber-grid">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  User Profile
                </CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent>
                {userProfile ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{userProfile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Role</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium capitalize">{userProfile.role}</p>
                        <Badge variant={isAdmin ? 'default' : 'outline'}>
                          {isAdmin ? 'Admin' : 'User'}
                        </Badge>
                      </div>
                    </div>
                    {userProfile.display_name && (
                      <div>
                        <p className="text-sm text-muted-foreground">Display Name</p>
                        <p className="font-medium">{userProfile.display_name}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Last Active</p>
                      <p className="font-medium">
                        {new Date(userProfile.last_active).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>No profile data available</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline">Edit Profile</Button>
              </CardFooter>
            </Card>

            <Card className="glass-neo cyber-grid">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Theme Mode</p>
                    <p className="font-medium capitalize">{activeTheme?.theme.mode || 'System'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Created</p>
                    <p className="font-medium">
                      {userProfile?.created_at 
                        ? new Date(userProfile.created_at).toLocaleDateString() 
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Change Password</Button>
                <Button variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="theme">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-neo cyber-grid">
              <CardHeader>
                <CardTitle>Current Theme</CardTitle>
                <CardDescription>
                  {currentTheme?.name || 'Default Theme'}{' '}
                  {currentTheme?.is_default && <Badge variant="outline">Default</Badge>}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Version</p>
                    <p className="font-medium">v{currentTheme?.version || '1.0'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge 
                      variant={currentTheme?.status === 'active' ? 'default' : 'outline'}
                      className={
                        currentTheme?.status === 'active' 
                          ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' 
                          : ''
                      }
                    >
                      {currentTheme?.status || 'Active'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">
                      {currentTheme?.updated_at 
                        ? new Date(currentTheme.updated_at).toLocaleString() 
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-neo cyber-grid">
              <CardHeader>
                <CardTitle>Theme Colors</CardTitle>
                <CardDescription>Visual style of the current theme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(dynamicColors).slice(0, 6).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: value }}
                      />
                      <div>
                        <p className="text-sm font-medium">{key}</p>
                        <p className="text-xs text-muted-foreground">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Theme Properties
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="admin">
            <Card className="glass-neo cyber-grid">
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>
                  Quick access to admin features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <span className="text-lg font-medium">Theme Manager</span>
                    <span className="text-sm text-muted-foreground">Edit system themes</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <span className="text-lg font-medium">User Manager</span>
                    <span className="text-sm text-muted-foreground">Manage user accounts</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <span className="text-lg font-medium">System Settings</span>
                    <span className="text-sm text-muted-foreground">Configure application</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <span className="text-lg font-medium">Audit Logs</span>
                    <span className="text-sm text-muted-foreground">View system activity</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default UserOverview;
