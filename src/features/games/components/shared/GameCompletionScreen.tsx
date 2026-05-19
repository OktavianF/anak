/**
 * GameCompletionScreen - Layar setelah game selesai
 * 
 * Menampilkan hasil permainan, skor, dan statistik.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, RotateCcw, Home, Sparkles, Medal, Crown } from 'lucide-react';
import type { GameCompletionScreenProps, GameTheme, CompletionStat } from './types';

const themeGradients: Record<GameTheme, string> = {
  purple: 'from-purple-500 to-pink-600',
  blue: 'from-blue-500 to-indigo-600',
  green: 'from-emerald-500 to-teal-600',
  orange: 'from-orange-500 to-amber-600',
  pink: 'from-pink-500 to-rose-600',
};

export function GameCompletionScreen({
  title,
  message,
  score,
  stats,
  theme = 'purple',
  stickerEarned,
  onPlayAgain,
  onExit,
}: GameCompletionScreenProps) {
  const gradient = themeGradients[theme];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header dengan confetti effect */}
      <div className={`bg-gradient-to-r ${gradient} px-6 pt-14 pb-12 relative overflow-hidden`}>
        {/* Animated stars background */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300"
            style={{
              left: `${(i % 4) * 25 + Math.random() * 25}%`,
              top: `${Math.floor(i / 4) * 33 + Math.random() * 33}%`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            ✨
          </motion.div>
        ))}

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-300" />
          </div>
          <h1 className="text-white font-heading font-bold text-2xl mb-2">{title}</h1>
          <p className="text-white/80 font-body text-center">{message}</p>
        </motion.div>
      </div>

      {/* Score Card */}
      <div className="px-6 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          {/* Main Score */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.5 }}
              className="inline-flex items-center gap-2"
            >
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              <span className="text-5xl font-heading font-bold text-gray-900">{score}</span>
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            </motion.div>
            <p className="text-gray-500 font-body mt-2">Skor Total</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                {stat.icon && <div className="flex justify-center mb-2">{stat.icon}</div>}
                <p className="text-2xl font-heading font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-500 font-body text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Sticker Earned */}
          {stickerEarned && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 mb-6 border-2 border-yellow-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{stickerEarned}</span>
                <div>
                  <p className="font-heading font-bold text-gray-900">Sticker Baru!</p>
                  <p className="text-gray-500 font-body text-sm">
                    Kamu mendapatkan sticker baru! 🎉
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              onClick={onPlayAgain}
              className={`w-full bg-gradient-to-r ${gradient} text-white py-4 px-6 rounded-2xl font-heading font-bold text-lg shadow-md flex items-center justify-center gap-2`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <RotateCcw className="w-5 h-5" />
              Main Lagi
            </motion.button>

            <motion.button
              onClick={onExit}
              className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl font-heading font-bold text-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Home className="w-5 h-5" />
              Kembali
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * GameOverScreen - Layar game over (kehabisan nyawa)
 */
export function GameOverScreen({
  score,
  level,
  theme = 'purple',
  onRetry,
  onExit,
}: {
  score: number;
  level: number;
  theme?: GameTheme;
  onRetry: () => void;
  onExit: () => void;
}) {
  const gradient = themeGradients[theme];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-7xl mb-6"
      >
        😢
      </motion.div>

      <h1 className="font-heading font-bold text-2xl text-gray-900 mb-2">Game Over!</h1>
      <p className="text-gray-500 font-body mb-6">Jangan menyerah, coba lagi ya!</p>

      <div className="bg-white rounded-2xl p-6 shadow-sm w-full max-w-xs mb-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-3xl font-heading font-bold text-gray-900">{score}</p>
            <p className="text-gray-500 font-body text-sm">Skor</p>
          </div>
          <div>
            <p className="text-3xl font-heading font-bold text-gray-900">{level}</p>
            <p className="text-gray-500 font-body text-sm">Level</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 w-full max-w-xs">
        <motion.button
          onClick={onRetry}
          className={`w-full bg-gradient-to-r ${gradient} text-white py-4 px-6 rounded-2xl font-heading font-bold`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Coba Lagi 💪
        </motion.button>

        <motion.button
          onClick={onExit}
          className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-heading font-bold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Kembali
        </motion.button>
      </div>
    </div>
  );
}

export default GameCompletionScreen;
