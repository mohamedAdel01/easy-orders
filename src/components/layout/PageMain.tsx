import React from 'react';

interface PageMainProps {
  children: React.ReactNode;
}

export default function PageMain({ children }: PageMainProps) {
  return <main className="flex-1">{children}</main>;
}
