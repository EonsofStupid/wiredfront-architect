
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MainLayout from '@/components/layout/MainLayout';
import { Shield, Zap, Code, Users } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { glassMorphismLevelAtom } from '@/atoms';

const LandingPage = () => {
  const navigate = useNavigate();
  const glassMorphismLevel = useAtomValue(glassMorphismLevelAtom);

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

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 cyber-text">
            <span className="text-gradient">WiredFRONT</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80">
            The AI-powered development platform for the future
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="cyber-button"
              onClick={() => navigate('/user/overview')}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="enhanced-glowing-border"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {[
            {
              title: "AI Assistance",
              description: "Intelligent code suggestions and automated solutions",
              icon: Zap,
              color: "neon-text"
            },
            {
              title: "Developer Tools",
              description: "Powerful tools for efficient workflow and debugging",
              icon: Code,
              color: "neon-text-green"
            },
            {
              title: "Team Collaboration",
              description: "Real-time collaboration and version control",
              icon: Users,
              color: "neon-text-purple"
            },
            {
              title: "Enterprise Security",
              description: "Role-based access control and data protection",
              icon: Shield,
              color: "neon-text"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`${getGlassMorphismClass()} p-6 rounded-lg border border-white/10 hover-random-effect`}
            >
              <feature.icon className={`h-10 w-10 mb-4 ${feature.color}`} />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default LandingPage;
