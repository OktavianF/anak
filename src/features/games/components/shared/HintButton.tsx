/**
 * HintButton - Tombol untuk menampilkan hint/petunjuk
 * 
 * Tombol dengan animasi yang menunjukkan status hint.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, HelpCircle } from 'lucide-react';
import type { HintButtonProps } from './types';

export function HintButton({ isActive, onUseHint, disabled = false }: HintButtonProps) {
  return (
    <motion.button
      onClick={onUseHint}
      disabled={disabled || isActive}
      className={`p-2 rounded-xl transition-colors ${
        isActive || disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
      }`}
      whileTap={!disabled && !isActive ? { scale: 0.95 } : {}}
      whileHover={!disabled && !isActive ? { scale: 1.05 } : {}}
      aria-label={isActive ? 'Hint sudah digunakan' : 'Gunakan hint'}
    >
      <motion.div
        animate={!isActive && !disabled ? { rotate: [0, -15, 15, 0] } : {}}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <Lightbulb className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
}

/**
 * HintBox - Kotak hint yang muncul setelah tombol ditekan
 */
export function HintBox({
  show,
  text,
  onClose,
}: {
  show: boolean;
  text: string;
  onClose?: () => void;
}) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-yellow-50 p-3 rounded-xl border border-yellow-200"
    >
      <div className="flex items-start gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-gray-600 font-body text-sm flex-1">{text}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Tutup hint"
          >
            ×
          </button>
        )}
      </div>
    </motion.div>
  );
}

/**
 * HintCounter - Menampilkan jumlah hint yang tersisa
 */
export function HintCounter({
  remaining,
  max,
}: {
  remaining: number;
  max: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Lightbulb className="w-4 h-4 text-yellow-500" />
      <span className="text-sm font-medium text-gray-600">
        {remaining}/{max}
      </span>
    </div>
  );
}

export default HintButton;
