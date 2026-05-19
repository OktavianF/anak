/**
 * LivesIndicator - Menampilkan indikator nyawa
 * 
 * Menampilkan titik-titik yang menunjukkan sisa nyawa pemain.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import type { LivesIndicatorProps } from './types';

const sizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-3 h-3',
};

export function LivesIndicator({ current, max, size = 'md' }: LivesIndicatorProps) {
  const dotSize = sizeClasses[size];

  return (
    <div className="flex space-x-1 justify-center">
      {[...Array(max)].map((_, i) => (
        <motion.div
          key={i}
          className={`${dotSize} rounded-full ${
            i < current ? 'bg-red-400' : 'bg-white/30'
          }`}
          initial={false}
          animate={
            i === current - 1 && current < max
              ? { scale: [1, 1.3, 1] }
              : {}
          }
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}

/**
 * LivesIndicatorHeart - Versi dengan icon heart
 */
export function LivesIndicatorHeart({ current, max, size = 'md' }: LivesIndicatorProps) {
  const heartSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex space-x-1 justify-center">
      {[...Array(max)].map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < current ? { scale: 1 } : { scale: 0.8 }}
        >
          <Heart
            className={`${heartSizes[size]} ${
              i < current 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-300 fill-gray-200'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default LivesIndicator;
