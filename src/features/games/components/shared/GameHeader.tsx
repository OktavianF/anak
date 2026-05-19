/**
 * GameHeader - Header untuk semua game screen
 * 
 * Menampilkan tombol back, judul game, dan tombol reset.
 * Mendukung berbagai tema warna.
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import type { GameHeaderProps, GameTheme } from './types';

const themeGradients: Record<GameTheme, string> = {
  purple: 'from-purple-500 to-pink-600',
  blue: 'from-blue-500 to-indigo-600',
  green: 'from-emerald-500 to-teal-600',
  orange: 'from-orange-500 to-amber-600',
  pink: 'from-pink-500 to-rose-600',
};

export function GameHeader({
  title,
  theme = 'purple',
  onBack,
  onReset,
  showReset = true,
}: GameHeaderProps) {
  const gradient = themeGradients[theme];

  return (
    <div className={`bg-gradient-to-r ${gradient} px-6 pt-14 pb-6`}>
      <div className="flex items-center justify-between">
        <motion.button
          onClick={onBack}
          className="p-2 rounded-xl bg-white/20"
          whileTap={{ scale: 0.95 }}
          aria-label="Kembali"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </motion.button>
        
        <h1 className="text-white font-heading font-bold text-lg">{title}</h1>
        
        {showReset ? (
          <motion.button
            onClick={onReset}
            className="p-2 rounded-xl bg-white/20"
            whileTap={{ scale: 0.95 }}
            aria-label="Reset permainan"
          >
            <RotateCcw className="w-6 h-6 text-white" />
          </motion.button>
        ) : (
          <div className="w-10" /> // Spacer untuk alignment
        )}
      </div>
    </div>
  );
}

export default GameHeader;
