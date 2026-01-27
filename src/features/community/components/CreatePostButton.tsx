import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

export function CreatePostButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-28 right-6"
    >
      <motion.button
        className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center border border-white/20"
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-7 h-7" strokeWidth={2} />
      </motion.button>
    </motion.div>
  );
}
