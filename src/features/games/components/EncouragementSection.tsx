import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const EncouragementSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-8 mb-6"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-1">
        <div className="bg-white/95 backdrop-blur-sm rounded-[1.25rem] p-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-purple-700">
                Kamu Luar Biasa! 🌟
              </h3>
              <p className="text-sm text-purple-600/80">
                Setiap permainan adalah petualangan baru. Ayo jelajahi dan
                temukan kemampuan supermu!
              </p>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-4xl"
            >
              🚀
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
