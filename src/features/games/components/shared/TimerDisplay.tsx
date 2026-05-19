/**
 * TimerDisplay - Menampilkan countdown timer
 * 
 * Menampilkan waktu tersisa dengan animasi warning ketika waktu hampir habis.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Clock, AlertTriangle } from 'lucide-react';
import type { TimerDisplayProps, GameTheme } from './types';

export function TimerDisplay({
  timeLeft,
  theme = 'purple',
  warning = 10,
  size = 'md',
}: TimerDisplayProps) {
  const isWarning = timeLeft <= warning;
  const isCritical = timeLeft <= 5;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <motion.div
      className="flex items-center justify-center space-x-1"
      animate={
        isCritical
          ? { scale: [1, 1.1, 1] }
          : isWarning
          ? { scale: [1, 1.05, 1] }
          : {}
      }
      transition={{
        duration: isCritical ? 0.5 : 1,
        repeat: isWarning ? Infinity : 0,
      }}
    >
      {isCritical ? (
        <AlertTriangle className={`${iconSizes[size]} text-red-400`} />
      ) : (
        <Clock className={`${iconSizes[size]} text-white`} />
      )}
      <span
        className={`font-heading font-bold ${sizeClasses[size]} ${
          isCritical
            ? 'text-red-400'
            : isWarning
            ? 'text-yellow-300'
            : 'text-white'
        }`}
      >
        {timeLeft}
      </span>
    </motion.div>
  );
}

/**
 * TimerDisplayCircular - Timer dengan progress circle
 */
export function TimerDisplayCircular({
  timeLeft,
  maxTime,
  size = 48,
}: {
  timeLeft: number;
  maxTime: number;
  size?: number;
}) {
  const progress = (timeLeft / maxTime) * 100;
  const circumference = 2 * Math.PI * (size / 2 - 4);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (timeLeft <= 5) return '#ef4444'; // red
    if (timeLeft <= 10) return '#f59e0b'; // yellow
    return '#10b981'; // green
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 4}
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 4}
          stroke={getColor()}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-heading font-bold text-sm" style={{ color: getColor() }}>
          {timeLeft}
        </span>
      </div>
    </div>
  );
}

export default TimerDisplay;
