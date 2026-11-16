import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      {children}
    </div>
  );
}
