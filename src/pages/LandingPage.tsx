
import { Button } from "@/components/ui/button";
import { useNavigate } from "@/hooks";
import { Shield, Zap, Code, Users } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { glassMorphismLevelAtom } from '@/atoms';

const LandingPage = () => {
  const glassMorphismLevel = useAtomValue(glassMorphismLevelAtom);
  const navigate = useNavigate();
  
  const getGlassMorphismClass = () => {
    switch(glassMorphismLevel) {
      case 'default':
        return 'glassmorphism-low';
      case 'enhanced':
        return 'glassmorphism-medium';
      case 'cyber':
        return 'glassmorphism-high';
      default:
        return 'glassmorphism-medium';
    }
  };

  const featureCards = [
    {
      title: 'AI Code Generation',
      description: 'Generate code snippets and entire components with AI assistance.',
      icon: Code,
    },
    {
      title: 'Real-time Collaboration',
      description: 'Collaborate with team members in real-time with shared access and live updates.',
      icon: Users,
    },
    {
      title: 'Lightning Fast',
      description: 'Experience the speed of AI-assisted development with optimized performance.',
      icon: Zap,
    },
    {
      title: 'Secure & Reliable',
      description: 'Benefit from enterprise-grade security and reliability for your projects.',
      icon: Shield,
    },
  ];

  return (
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
            onClick={() => navigate.to('/user/overview')}
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
        {featureCards.map((card, index) => (
          <div key={index} className={`p-6 rounded-lg shadow-md ${getGlassMorphismClass()} hover:shadow-lg transition-shadow duration-300`}>
            <card.icon className="w-6 h-6 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">{card.title}</h3>
            <p className="text-foreground/80">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
