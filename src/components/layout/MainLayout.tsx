
import { useState } from 'react';
import { Menu, PanelRightClose, PanelRightOpen } from 'lucide-react';
import TopBar from './TopBar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import BottomBar from './BottomBar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);

  const toggleLeftSidebar = () => {
    setLeftSidebarCollapsed(!leftSidebarCollapsed);
  };

  const toggleRightSidebar = () => {
    setRightSidebarVisible(!rightSidebarVisible);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      {/* Top Bar */}
      <TopBar 
        onMenuClick={toggleLeftSidebar}
        onRightPanelClick={toggleRightSidebar}
        rightSidebarVisible={rightSidebarVisible}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar collapsed={leftSidebarCollapsed} />
        
        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          "bg-content overflow-hidden flex flex-col relative",
        )}>
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6">
            {children}
          </div>
        </main>
        
        {/* Right Sidebar */}
        <RightSidebar visible={rightSidebarVisible} />
      </div>
      
      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
};

export default MainLayout;
