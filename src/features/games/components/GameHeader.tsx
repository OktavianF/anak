import React from 'react';
import { motion } from 'motion/react';
import { User, Settings } from 'lucide-react';

interface GameHeaderProps {
  childName: string;
  childCoins?: number;
  onProfileClick?: () => void;
  onParentModeClick?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  childName,
  childCoins = 0,
  onProfileClick,
  onParentModeClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-6"
    >
      {/* Child Profile Mini Card */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onProfileClick}
        className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border-2 border-purple-100 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-md">
          <User className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-purple-700">
            Halo, {childName}! 👋
          </span> 
          <div className="flex items-center gap-1">
            <span className="text-xs">🪙</span>
            <span className="text-xs font-semibold text-amber-600">
              {childCoins} Koin
            </span>
          </div>
        </div>
      </motion.div>

      {/* Center Title */}
      <div className="text-center flex-1">
        <motion.h1
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl font-extrabold"
        >
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
            Dunia Permainan
          </span>
        </motion.h1>
        <p className="text-xs text-purple-600/80 font-medium mt-1">
          ✨ Pilih petualanganmu! ✨
        </p>
      </div>

      {/* Parent Mode Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onParentModeClick}
        className="flex items-center gap-2 bg-gradient-to-r from-slate-100 to-gray-100 rounded-xl px-3 py-2 shadow-md border border-slate-200"
      >
        <Settings className="w-4 h-4 text-slate-600" />
        <span className="text-xs font-semibold text-slate-600">
          Mode Orang Tua
        </span>
      </motion.button>
    </motion.div>
  );
};
