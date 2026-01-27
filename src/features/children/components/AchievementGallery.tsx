import React from 'react';
import { motion } from 'motion/react';
import { getRarityColor, getRarityGlow } from '../utils/rarityUtils';

interface Achievement {
  id: string;
  name: string;
  emoji: string;
  rarity: string;
  earned: boolean;
  description: string;
}

interface AchievementGalleryProps {
  achievements: Achievement[];
}

export function AchievementGallery({ achievements }: AchievementGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/30"
    >
      <div className="text-center mb-4">
        <h2 className="text-white font-heading text-2xl mb-2">🏆 Trophy Collection 🏆</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{
              opacity: achievement.earned ? 1 : 0.3,
              scale: achievement.earned ? 1 : 0.9,
              rotate: 0,
            }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-gradient-to-br ${getRarityColor(
              achievement.rarity
            )} rounded-2xl p-4 text-center shadow-xl ${getRarityGlow(achievement.rarity)} ${
              achievement.earned ? 'border-2 border-white' : 'border border-white/50'
            }`}
            whileHover={achievement.earned ? { scale: 1.1, rotate: 5 } : {}}
          >
            {achievement.earned && (
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ✓
              </motion.div>
            )}

            <div className="text-3xl mb-2">{achievement.emoji}</div>
            <div className="text-white text-xs font-bold">{achievement.name}</div>

            {achievement.earned && achievement.rarity === 'legendary' && (
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(255,215,0,0)',
                    '0 0 20px rgba(255,215,0,0.6)',
                    '0 0 0px rgba(255,215,0,0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
