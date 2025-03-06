
import { PlusCircle, Zap, Clock, Star, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const recentProjects = [
    { name: 'E-commerce Platform', type: 'React', lastEdited: '2 hours ago' },
    { name: 'Task Management App', type: 'Vue', lastEdited: '5 hours ago' },
    { name: 'Portfolio Website', type: 'Next.js', lastEdited: 'Yesterday' },
    { name: 'Mobile Game UI', type: 'React Native', lastEdited: '3 days ago' },
  ];

  const quickActions = [
    { name: 'New Project', icon: PlusCircle },
    { name: 'AI Assistant', icon: Zap },
    { name: 'Recent Activity', icon: Clock },
    { name: 'Saved Snippets', icon: Star },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fadeIn">
      <section>
        <h1 className="text-3xl font-bold mb-2">Welcome to WiredFRONT</h1>
        <p className="text-foreground/70">Your AI-assisted development workspace</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glassmorphism rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-semibold">Recent Projects</h2>
          </div>
          <div className="divide-y divide-white/5">
            {recentProjects.map((project, index) => (
              <div key={index} className="px-6 py-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-xs text-foreground/60">{project.type} • {project.lastEdited}</div>
                </div>
                <button className="p-1.5 rounded-full hover:bg-white/10">
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 border-t border-white/10">
            <button className="text-sm text-primary hover:underline flex items-center">
              <span>View all projects</span>
              <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glassmorphism rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 glowing-border"
                >
                  <action.icon size={24} className="mb-2 text-primary" />
                  <span className="text-sm">{action.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glassmorphism rounded-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">Developer Mode</h2>
              <p className="text-sm text-foreground/70 mb-4">
                Start coding with AI assistance and real-time collaboration
              </p>
              <button className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Launch Developer Mode
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="glassmorphism rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Activity Feed</h2>
        </div>
        <div className="p-6 grid grid-cols-1 gap-4">
          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Zap size={18} className="text-primary" />
            </div>
            <div>
              <div className="font-medium">AI Assistant generated code</div>
              <div className="text-sm text-foreground/60">10 minutes ago • E-commerce Platform</div>
              <div className="mt-2 text-sm p-2 bg-white/5 rounded border border-white/10 text-foreground/80">
                <code>Created 5 components for product listing functionality</code>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full bg-cyberpunk-teal/20 flex items-center justify-center">
              <Clock size={18} className="text-cyberpunk-teal" />
            </div>
            <div>
              <div className="font-medium">Project synchronized with GitHub</div>
              <div className="text-sm text-foreground/60">3 hours ago • Task Management App</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
