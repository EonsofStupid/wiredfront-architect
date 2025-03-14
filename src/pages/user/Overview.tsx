
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UserOverview = () => {
  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-3xl font-bold neon-text">User Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cyber-glassmorphism border-white/10">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <p>User since: Jan 2023</p>
            <p>Status: Active</p>
          </CardContent>
        </Card>
        
        <Card className="cyber-glassmorphism border-white/10">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Your recent actions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Last login: Today</p>
            <p>Recent projects: 3</p>
          </CardContent>
        </Card>
        
        <Card className="cyber-glassmorphism border-white/10">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Notifications: Enabled</p>
            <p>Two-factor auth: Disabled</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserOverview;
