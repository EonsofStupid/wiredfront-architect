
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-3xl font-bold neon-text">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cyber-glassmorphism border-white/10">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total users: 245</p>
            <p>Active now: 32</p>
          </CardContent>
        </Card>
        
        <Card className="cyber-glassmorphism border-white/10">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Infrastructure and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>System uptime: 99.98%</p>
            <p>Average response: 120ms</p>
          </CardContent>
        </Card>
        
        <Card className="cyber-glassmorphism border-white/10">
          <CardHeader>
            <CardTitle>Theme Configuration</CardTitle>
            <CardDescription>Customize application appearance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Active theme: Cyberpunk</p>
            <p>Custom themes: 3</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
