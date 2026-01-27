import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Play, Star } from 'lucide-react';

interface AdventureButtonProps {
  childName: string;
  onStartAdventure: () => void;
}

export const AdventureButton: React.FC<AdventureButtonProps> = ({
  childName,
  onStartAdventure,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-6 mb-8 shadow-2xl shadow-purple-500/25 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 right-4 text-white text-2xl">🎮</div>
        <div className="absolute bottom-2 left-4 text-white text-xl">🌟</div>
        <div className="absolute top-1/2 left-8 text-white text-lg">🎯</div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-heading text-2xl mb-2">Game-Based Assessment</h2>
            <p className="text-white/90 text-base mb-4">
              Saatnya {childName} memulai petualangan belajar yang menyenangkan!
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
        </div>

        <motion.button
          onClick={onStartAdventure}
          className="w-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold py-4 px-6 rounded-2xl shadow-lg border border-white/30 flex items-center justify-center space-x-3 transition-all"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play className="w-6 h-6" />
          <span className="text-lg">Mulai Petualangan {childName}!</span>
          <Star className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};
