import React from 'react';
import { motion } from 'motion/react';

export const FluidReasoningIllustration: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Puzzle pieces floating animation */}
    <motion.div
      animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute top-2 left-2 text-xl"
    >
      🧩
    </motion.div>
    <motion.div
      animate={{ y: [5, -5, 5], rotate: [0, -10, 0] }}
      transition={{ duration: 2.5, repeat: Infinity }}
      className="absolute bottom-3 right-2 text-lg"
    >
      💡
    </motion.div>
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute top-1/2 right-3 text-sm"
    >
      ✨
    </motion.div>
    {/* Connecting dots */}
    <svg className="absolute inset-0 w-full h-full opacity-20">
      <motion.circle
        cx="20%"
        cy="30%"
        r="4"
        fill="currentColor"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="80%"
        cy="40%"
        r="4"
        fill="currentColor"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.line
        x1="20%"
        y1="30%"
        x2="80%"
        y2="40%"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="5,5"
        animate={{ strokeDashoffset: [0, 10] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  </div>
);

export const VisualProcessingIllustration: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Ocean theme with whale */}
    <motion.div
      animate={{ x: [-10, 10, -10], y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-3 left-2 text-2xl"
    >
      🐋
    </motion.div>
    <motion.div
      animate={{ y: [2, -2, 2] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-3 right-3 text-lg"
    >
      🌊
    </motion.div>
    <motion.div
      animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute top-2 right-2 text-sm"
    >
      🔮
    </motion.div>
    {/* Bubbles */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [20, -20],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
        }}
        className="absolute bottom-0 text-xs"
        style={{ left: `${20 + i * 25}%` }}
      >
        ○
      </motion.div>
    ))}
  </div>
);

export const WorkingMemoryIllustration: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Brain with gears */}
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute top-2 left-3 text-xl"
    >
      🧠
    </motion.div>
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      className="absolute top-3 right-2 text-lg"
    >
      ⚙️
    </motion.div>
    <motion.div
      animate={{ rotate: [360, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      className="absolute bottom-4 right-4 text-sm"
    >
      ⚙️
    </motion.div>
    {/* Memory cards floating */}
    <motion.div
      animate={{ y: [-3, 3, -3], rotateY: [0, 180, 0] }}
      transition={{ duration: 2.5, repeat: Infinity }}
      className="absolute bottom-3 left-3 text-lg"
    >
      🃏
    </motion.div>
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="absolute top-1/2 left-1/2 text-xs"
    >
      💫
    </motion.div>
  </div>
);

// Map domain IDs to their illustrations (3 domains only: Gf, Gv, Gsm)
export const domainIllustrations: Record<string, React.FC> = {
  'fluid-reasoning': FluidReasoningIllustration,
  'visual-processing': VisualProcessingIllustration,
  'working-memory': WorkingMemoryIllustration,
};
