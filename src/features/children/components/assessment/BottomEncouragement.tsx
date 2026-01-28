import React from 'react';
import { motion } from 'motion/react';

export function BottomEncouragement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 150 }}
      className="text-center mt-6 mb-6"
    >
      <motion.div
        className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 mx-6 border border-white/50 shadow-2xl relative overflow-hidden"
        animate={{
          scale: [1, 1.02, 1],
          boxShadow: [
            '0 10px 30px rgba(0,0,0,0.1)',
            '0 15px 40px rgba(0,0,0,0.15)',
            '0 10px 30px rgba(0,0,0,0.1)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Floating decorations */}
        <FloatingDecorations />

        <motion.p
          className="text-white font-heading text-xl mb-3 font-bold drop-shadow-lg"
          animate={{
            textShadow: [
              '0 0 10px rgba(255,255,255,0.5)',
              '0 0 20px rgba(255,255,255,0.8)',
              '0 0 10px rgba(255,255,255,0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🌟 Setiap latihan membuat kamu jadi SUPERHERO! 🦸‍♂️
        </motion.p>

        <motion.p
          className="text-white/95 text-base font-medium leading-relaxed"
          animate={{ scale: [1, 1.01, 1] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Pilih petualangan seru di atas dan tunjukkan kehebatanmu! 🚀✨
        </motion.p>

        {/* Animated progress indicators */}
        <ProgressDots />
      </motion.div>
    </motion.div>
  );
}

function FloatingDecorations() {
  const decorations = [
    { emoji: '🏆', position: 'top-2 left-4', animation: { y: [0, -8, 0], rotate: [0, 15, 0] }, delay: 0 },
    { emoji: '🎯', position: 'top-2 right-4', animation: { y: [0, -6, 0], rotate: [0, -15, 0] }, delay: 0.5 },
    { emoji: '💡', position: 'bottom-2 left-6', animation: { y: [0, -5, 0], scale: [1, 1.1, 1] }, delay: 1 },
    { emoji: '⭐', position: 'bottom-2 right-6', animation: { y: [0, -7, 0], scale: [1, 1.2, 1] }, delay: 1.5 },
  ];

  return (
    <>
      {decorations.map((dec, i) => (
        <motion.div
          key={i}
          className={`absolute ${dec.position} text-${i < 2 ? '2xl' : 'xl'}`}
          animate={dec.animation}
          transition={{
            duration: 2 + i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: dec.delay,
          }}
        >
          {dec.emoji}
        </motion.div>
      ))}
    </>
  );
}

function ProgressDots() {
  return (
    <motion.div
      className="flex justify-center space-x-2 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-yellow-300 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
}
