import React from 'react';
import { motion } from 'motion/react';
import { Coins } from 'lucide-react';

interface CoinsDisplayProps {
  coins: number;
}

export function CoinsDisplay({ coins }: CoinsDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white/30 backdrop-blur-md rounded-full px-6 py-3 inline-flex items-center space-x-2 border border-white/50"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Coins className="w-6 h-6 text-yellow-300" />
      </motion.div>
      <span className="text-white font-heading text-xl font-bold">{coins.toLocaleString()}</span>
    </motion.div>
  );
}
