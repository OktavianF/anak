import React from 'react';
import { motion } from 'motion/react';
import { Settings } from 'lucide-react';

interface ProfileAvatarProps {
  avatar: string;
  childName: string;
  onCustomize: () => void;
}

export default function ProfileAvatar({ avatar, childName, onCustomize }: ProfileAvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="text-center"
    >
      {/* Large Customizable Avatar */}
      <motion.div
        className="relative inline-block mb-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCustomize}
      >
        {/* Avatar Container with Glow Effect */}
        <div className="relative">
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-white to-blue-100 flex items-center justify-center text-7xl shadow-2xl border-4 border-white"
            animate={{
              boxShadow: [
                '0 0 20px rgba(255,255,255,0.5)',
                '0 0 40px rgba(255,255,255,0.8)',
                '0 0 20px rgba(255,255,255,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>{avatar}</span>
          </motion.div>

          {/* Customization Button */}
          <motion.button
            className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-3 border-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Settings className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Child Name with Fun Typography */}
      <motion.h1
        className="text-white font-heading text-4xl mb-2 drop-shadow-lg"
        animate={{
          textShadow: [
            '0 0 10px rgba(255,255,255,0.5)',
            '0 0 20px rgba(255,255,255,0.8)',
            '0 0 10px rgba(255,255,255,0.5)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {childName} 🌟
      </motion.h1>
    </motion.div>
  );
}
