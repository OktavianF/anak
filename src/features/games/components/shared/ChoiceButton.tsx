/**
 * ChoiceButton - Tombol pilihan jawaban
 * 
 * Tombol generik untuk pilihan jawaban dengan feedback visual.
 */

import React from 'react';
import { motion } from 'motion/react';
import type { ChoiceButtonProps, FeedbackType } from './types';

export function ChoiceButton<T>({
  value,
  isSelected,
  feedbackType,
  onClick,
  disabled = false,
  children,
  className = '',
}: ChoiceButtonProps<T>) {
  const getButtonStyle = () => {
    if (isSelected && feedbackType === 'correct') {
      return 'bg-gradient-to-br from-green-400 to-green-500 text-white border-green-600';
    }
    if (isSelected && feedbackType === 'wrong') {
      return 'bg-gradient-to-br from-red-400 to-red-500 text-white border-red-600';
    }
    if (disabled) {
      return 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed';
    }
    return 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border-gray-300 hover:from-gray-200 hover:to-gray-300';
  };

  return (
    <motion.button
      onClick={() => onClick(value)}
      disabled={disabled || !!feedbackType}
      className={`py-4 px-6 rounded-2xl font-bold shadow-md transition-all border-2 ${getButtonStyle()} ${className}`}
      whileHover={!disabled && !feedbackType ? { scale: 1.05 } : {}}
      whileTap={!disabled && !feedbackType ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-center gap-2">
        {children}
        {isSelected && feedbackType && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-white"
          >
            {feedbackType === 'correct' ? '✓' : '✗'}
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}

/**
 * ChoiceGrid - Grid container untuk pilihan jawaban
 */
export function ChoiceGrid({
  children,
  columns = 2,
  gap = 3,
}: {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 2 | 3 | 4;
}) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const gapClass = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} ${gapClass[gap]}`}>
      {children}
    </div>
  );
}

/**
 * NumberChoice - Tombol pilihan untuk angka
 */
export function NumberChoice({
  value,
  isSelected,
  feedbackType,
  onClick,
  disabled = false,
  delay = 0,
}: {
  value: number;
  isSelected: boolean;
  feedbackType: FeedbackType;
  onClick: (value: number) => void;
  disabled?: boolean;
  delay?: number;
}) {
  return (
    <motion.button
      onClick={() => onClick(value)}
      disabled={disabled || !!feedbackType}
      className={`py-4 px-6 rounded-2xl font-bold text-lg shadow-md transition-all ${
        isSelected
          ? feedbackType === 'correct'
            ? 'bg-gradient-to-br from-green-400 to-green-500 text-white'
            : feedbackType === 'wrong'
            ? 'bg-gradient-to-br from-red-400 to-red-500 text-white'
            : 'bg-gradient-to-br from-blue-400 to-blue-500 text-white'
          : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300'
      } ${feedbackType ? 'cursor-not-allowed' : 'hover:scale-105'}`}
      whileHover={!disabled && !feedbackType ? { scale: 1.05 } : {}}
      whileTap={!disabled && !feedbackType ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {value}
      {isSelected && feedbackType && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-2 inline-block"
        >
          {feedbackType === 'correct' ? '✓' : '✗'}
        </motion.span>
      )}
    </motion.button>
  );
}

export default ChoiceButton;
