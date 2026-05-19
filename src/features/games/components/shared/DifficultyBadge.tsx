/**
 * DifficultyBadge - Badge yang menampilkan tingkat kesulitan
 * 
 * Menampilkan label kesulitan dengan warna sesuai level.
 */

import React from 'react';
import { motion } from 'motion/react';
import type { DifficultyBadgeProps, Difficulty } from './types';

const difficultyConfig: Record<
  Difficulty,
  { label: string; bgColor: string; textColor: string }
> = {
  easy: {
    label: 'Mudah',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  medium: {
    label: 'Sedang',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
  },
  hard: {
    label: 'Sulit',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
};

export function DifficultyBadge({ difficulty, size = 'md' }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];
  const sizeClass = sizeClasses[size];

  return (
    <motion.span
      className={`${config.bgColor} ${config.textColor} ${sizeClass} rounded-full font-bold inline-block`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {config.label}
    </motion.span>
  );
}

/**
 * DifficultyBadgeWithIcon - Badge dengan icon
 */
export function DifficultyBadgeWithIcon({ difficulty, size = 'md' }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];
  const sizeClass = sizeClasses[size];

  const icons = {
    easy: '🌟',
    medium: '⚡',
    hard: '🔥',
  };

  return (
    <motion.span
      className={`${config.bgColor} ${config.textColor} ${sizeClass} rounded-full font-bold inline-flex items-center gap-1`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <span>{icons[difficulty]}</span>
      <span>{config.label}</span>
    </motion.span>
  );
}

export default DifficultyBadge;
