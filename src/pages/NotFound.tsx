
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from '@/components/layout/MainLayout';
import { AlertOctagon, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
        <div className="glassmorphism rounded-xl p-8 max-w-md w-full text-center">
          <div className="bg-destructive/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <AlertOctagon size={32} className="text-destructive" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-gradient">404</h1>
          <p className="text-xl text-foreground/80 mb-6">Oops! Page not found</p>
          <a 
            href="/" 
            className="inline-flex items-center py-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Return to Dashboard
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
