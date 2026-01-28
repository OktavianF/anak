import React from 'react';
import { motion } from 'motion/react';
import { Brain, Zap, Sparkles } from 'lucide-react';

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

// Comprehension Knowledge - Letter blocks
export function ComprehensionKnowledgeIllustration() {
  const blocks = ['A', 'B', 'C', '😊', '🔍', '🌟'];
  const colors = ['purple', 'pink', 'blue', 'green', 'yellow', 'orange'];

  return (
    <div className="grid grid-cols-3 gap-1 relative">
      {blocks.map((content, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
          className={`w-4 h-4 bg-gradient-to-br from-${colors[i]}-400 to-${colors[i]}-600 rounded border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg`}
        >
          {content}
        </motion.div>
      ))}
      <div className="absolute -top-2 -right-1 text-xs animate-bounce">📚</div>
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

// Long Term Memory - Treasure chest
export function LongTermMemoryIllustration() {
  return (
    <div className="relative">
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-14 h-10 bg-gradient-to-b from-amber-400 to-yellow-600 rounded-t-lg relative shadow-xl"
      >
        <div className="absolute top-1 left-2 right-2 h-2 bg-yellow-300 rounded-sm" />
        <div className="absolute top-4 left-1 right-1 h-1 bg-amber-600 rounded-sm" />
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-800 rounded-full"
        />
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 -right-2 text-lg"
      >
        💎
      </motion.div>
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, -180, -360] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -top-2 -left-3 text-sm"
      >
        🌟
      </motion.div>
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [0, 90, 180] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-1 -right-3 text-sm"
      >
        🏆
      </motion.div>
    </div>
  );
}

// Processing Speed - Lightning bolt
export function ProcessingSpeedIllustration() {
  return (
    <div className="relative">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Zap className="w-14 h-14 text-yellow-600 drop-shadow-lg" strokeWidth={3} fill="currentColor" />
      </motion.div>
      {[0, 0.1, 0.2].map((delay, i) => (
        <motion.div
          key={i}
          animate={{ x: [0, 15 - i * 3, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay }}
          className={`absolute top-${2 + i * 2} -right-1 w-${6 - i * 1.5} h-1 bg-${['yellow', 'orange', 'red'][i]}-400 rounded-full`}
          style={{ top: `${8 + i * 8}px`, width: `${24 - i * 6}px` }}
        />
      ))}
      <motion.div
        animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 -left-2"
      >
        <Sparkles className="w-4 h-4 text-yellow-400" />
      </motion.div>
      <div className="absolute -bottom-2 left-2 text-xs animate-bounce">💨</div>
    </div>
  );
}

// Auditory Processing - Sound waves
export function AuditoryProcessingIllustration() {
  const heights = [4, 6, 8, 6, 4];
  const colors = ['pink', 'rose', 'purple', 'rose', 'pink'];

  return (
    <div className="flex items-center justify-center space-x-1 relative">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          animate={{ scaleY: [1, 1.8 + i * 0.2, 1], opacity: [0.6 + i * 0.05, 1, 0.6 + i * 0.05] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
          className={`w-2 bg-gradient-to-t from-${colors[i]}-500 to-${colors[i]}-300 rounded-full shadow-md`}
          style={{ height: `${h * 4}px` }}
        />
      ))}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.3, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 border-2 border-pink-300 rounded-full"
      />
      <div className="absolute -top-3 -right-1 text-sm animate-bounce">🎧</div>
      <div className="absolute -bottom-2 -left-2 text-xs">🔊</div>
    </div>
  );
}

// Reaction Speed - Ninja
export function ReactionSpeedIllustration() {
  return (
    <div className="relative">
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-12 h-12 bg-gradient-to-b from-slate-600 to-gray-800 rounded-full relative shadow-xl flex items-center justify-center"
      >
        <div className="text-white text-lg">👁️</div>
        <div className="absolute -top-1 left-1 right-1 h-2 bg-red-500 rounded-t-full" />
      </motion.div>
      <motion.div
        animate={{ scale: [0, 2, 0], opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 w-12 h-12 border-2 border-slate-400 rounded-full"
      />
      <motion.div
        animate={{ scale: [0, 1.5, 0], opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="absolute inset-1 w-10 h-10 border-2 border-gray-500 rounded-full"
      />
      <motion.div
        animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-3 -right-3 text-sm"
      >
        ⭐
      </motion.div>
      <motion.div
        animate={{ rotate: [0, -360], scale: [1, 1.2, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: 0.5 }}
        className="absolute -bottom-3 -left-3 text-sm"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ x: [-5, 5, -5], opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 -right-6 w-4 h-1 bg-slate-400 rounded-full"
      />
    </div>
  );
}
