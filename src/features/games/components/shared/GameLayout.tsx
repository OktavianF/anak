/**
 * GameLayout - Wrapper utama untuk semua game screen
 * 
 * Menyediakan struktur dasar dan styling konsisten untuk semua game.
 */

import React from 'react';
import type { GameLayoutProps } from './types';

export function GameLayout({ children, theme = 'purple' }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {children}
    </div>
  );
}

export default GameLayout;
