
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { leftSidebarCollapsedAtom, rightSidebarVisibleAtom } from '@/atoms';
import TopBar from './TopBar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import BottomBar from './BottomBar';
import { setupRandomHoverEffects, setupCyberBackgrounds } from '@/lib/animations';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useAtom(leftSidebarCollapsedAtom);
  const [rightSidebarVisible, setRightSidebarVisible] = useAtom(rightSidebarVisibleAtom);

  const toggleLeftSidebar = () => {
    setLeftSidebarCollapsed(!leftSidebarCollapsed);
  };

  const toggleRightSidebar = () => {
    setRightSidebarVisible(!rightSidebarVisible);
  };

  // Setup animations when component mounts
  useEffect(() => {
    setupRandomHoverEffects();
    setupCyberBackgrounds();
    
    // Re-apply when theme or layout changes
    const observer = new MutationObserver(() => {
      setupRandomHoverEffects();
      setupCyberBackgrounds();
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class', 'data-theme'] 
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar 
        onMenuClick={toggleLeftSidebar} 
        onRightPanelClick={toggleRightSidebar}
        rightSidebarVisible={rightSidebarVisible}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar collapsed={leftSidebarCollapsed} />
        
        <main className="flex-1 overflow-auto bg-content text-content-foreground">
          {children}
        </main>
        
        <RightSidebar visible={rightSidebarVisible} />
      </div>
      
      <BottomBar />
    </div>
  );
};

export default MainLayout;
