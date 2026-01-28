import React from 'react';
import { motion } from 'motion/react';

interface AssessmentHeaderProps {
  onProfileClick: () => void;
  onParentModeClick: () => void;
}

export function AssessmentHeader({
  onProfileClick,
  onParentModeClick,
}: AssessmentHeaderProps) {
  return (
    <div className="relative z-10 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 items-center gap-4">
          {/* Child Profile - Left */}
          <ChildProfileButton onClick={onProfileClick} />

          {/* Title - Center */}
          <AssessmentTitle />

          {/* Parent Mode Button - Right */}
          <ParentModeButton onClick={onParentModeClick} />
        </div>
      </div>
    </div>
  );
}

function ChildProfileButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20, rotate: -10 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onClick={onClick}
      className="flex items-center space-x-3 bg-white/25 backdrop-blur-md rounded-3xl p-3 border border-white/40 shadow-xl justify-self-start"
      whileHover={{
        scale: 1.05,
        rotate: 2,
        transition: { type: 'spring', stiffness: 300 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-xl border-3 border-white"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="text-xl">👦</span>
      </motion.div>
    </motion.button>
  );
}

function AssessmentTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.2,
        type: 'spring',
        stiffness: 150,
        damping: 12,
      }}
      className="text-center justify-self-center"
    >
      <motion.h1
        className="text-white font-heading text-2xl lg:text-3xl mb-1 font-bold drop-shadow-lg leading-tight"
        animate={{
          scale: [1, 1.02, 1],
          textShadow: [
            '0 0 20px rgba(255,255,255,0.5)',
            '0 0 30px rgba(255,255,255,0.8)',
            '0 0 20px rgba(255,255,255,0.5)',
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Ayo Mulai Petualangannya!
      </motion.h1>
      <motion.p
        className="text-white/95 text-sm lg:text-base font-medium leading-tight"
        animate={{ y: [0, -2, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}

function ParentModeButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20, rotate: 10 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
      onClick={onClick}
      className="flex items-center space-x-2 bg-white/25 backdrop-blur-md rounded-3xl p-3 border border-white/40 hover:bg-white/35 transition-all duration-300 shadow-xl justify-self-end"
      whileHover={{
        scale: 1.05,
        rotate: -2,
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      }}
      whileTap={{ scale: 0.95, rotate: 2 }}
    >
      <motion.div
        className="w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full flex items-center justify-center shadow-lg border-3 border-white"
        animate={{
          rotate: [0, -5, 5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <span className="text-lg">👩</span>
      </motion.div>
    </motion.button>
  );
}
