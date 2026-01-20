import React from 'react';

interface GameLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout for game pages
 */
export function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative">
        {children}
      </div>
    </div>
  );
}

export default GameLayout;
