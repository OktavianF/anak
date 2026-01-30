import React from 'react';
import { motion } from 'motion/react';
import { Brain } from 'lucide-react';

// Fluid Reasoning - Puzzle pieces
export function FluidReasoningIllustration() {
  return (
    <div className="flex items-center justify-center space-x-1 relative">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-6 h-6 bg-blue-500 rounded-lg shadow-lg"
      />
      <motion.div
        animate={{ rotate: [0, -15, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        className="w-6 h-6 bg-pink-500 rounded-lg shadow-lg"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="w-6 h-6 bg-green-500 rounded-lg shadow-lg"
      />
      <motion.div
        animate={{ rotate: [0, 45, 90, 45, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="w-6 h-6 bg-yellow-500 rounded-lg shadow-lg"
      />
      <div className="absolute -top-2 -right-2 text-xs">✨</div>
    </div>
  );
}

// Visual Processing - Magic eye/whale
export function VisualProcessingIllustration() {
  return (
    <div className="flex items-center justify-center relative">
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-16 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full relative shadow-xl"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1 left-3 w-2 h-1 bg-cyan-200 rounded-full"
        />
        <motion.div
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1 right-2 w-4 h-3 bg-blue-800 rounded-full"
        />
        <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping" />
      </motion.div>
      <div className="absolute -top-3 -right-2 text-lg animate-bounce">👁️</div>
      <div className="absolute -bottom-2 -left-2 text-xs">✨</div>
    </div>
  );
}

// Working Memory - Brain with particles
export function WorkingMemoryIllustration() {
  return (
    <div className="relative">
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Brain className="w-14 h-14 text-emerald-600 drop-shadow-lg" strokeWidth={2} />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full shadow-lg"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full shadow-md"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full shadow-md"
      />
      <div className="absolute -top-3 left-3 text-xs animate-bounce">💭</div>
    </div>
  );
}
