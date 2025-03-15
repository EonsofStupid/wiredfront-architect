
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = {
  Base: ({ children }: RootLayoutProps) => (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  ),
  Main: ({ children }: RootLayoutProps) => (
    <MainLayout>{children}</MainLayout>
  )
};

export default RootLayout;
