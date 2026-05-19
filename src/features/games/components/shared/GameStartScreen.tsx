/**
 * GameStartScreen - Layar intro sebelum game dimulai
 * 
 * Menampilkan informasi tentang game, cara bermain, dan tombol mulai.
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Zap, Brain } from 'lucide-react';
import type { GameStartScreenProps, GameTheme, LevelInfo, GameFeature } from './types';

const themeGradients: Record<GameTheme, string> = {
  purple: 'from-purple-500 to-pink-600',
  blue: 'from-blue-500 to-indigo-600',
  green: 'from-emerald-500 to-teal-600',
  orange: 'from-orange-500 to-amber-600',
  pink: 'from-pink-500 to-rose-600',
};

const levelColors = {
  green: { bg: 'bg-green-100', text: 'text-green-700' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  red: { bg: 'bg-red-100', text: 'text-red-700' },
};

export function GameStartScreen({
  title,
  subtitle,
  description,
  icon,
  theme = 'purple',
  features = [],
  levelInfo = [],
  onStart,
  onBack,
  buttonText = 'Mulai Bermain! 🚀',
}: GameStartScreenProps) {
  const gradient = themeGradients[theme];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradient} px-6 pt-14 pb-8`}>
        <motion.button
          onClick={onBack}
          className="p-2 rounded-xl bg-white/20 mb-4"
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </motion.button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-4"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {icon}
          </motion.div>
          <h1 className="text-white font-heading font-bold text-2xl mb-2">{title}</h1>
          <p className="text-white/80 font-body">{subtitle}</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6 -mt-4">
        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <h2 className="font-heading font-bold text-gray-900 mb-3">Cara Bermain</h2>
          <p className="text-gray-600 font-body text-sm leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Features */}
        {features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <h2 className="font-heading font-bold text-gray-900 mb-4">Fitur Game</h2>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-800 text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 font-body text-xs">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Level Info */}
        {levelInfo.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <h2 className="font-heading font-bold text-gray-900 mb-4">Tingkat Kesulitan</h2>
            <div className="space-y-3">
              {levelInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className={`${levelColors[info.color].bg} ${levelColors[info.color].text} px-2 py-1 rounded-full text-xs font-bold`}>
                    {info.range}
                  </span>
                  <span className="text-gray-600 font-body text-sm">{info.description}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Start Button */}
        <motion.button
          onClick={onStart}
          className={`w-full bg-gradient-to-r ${gradient} text-white py-4 px-6 rounded-2xl font-heading font-bold text-lg shadow-lg`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {buttonText}
        </motion.button>
      </div>
    </div>
  );
}

/**
 * SimpleStartScreen - Versi sederhana tanpa level info
 */
export function SimpleStartScreen({
  title,
  emoji,
  description,
  theme = 'purple',
  onStart,
  onBack,
}: {
  title: string;
  emoji: string;
  description: string;
  theme?: GameTheme;
  onStart: () => void;
  onBack: () => void;
}) {
  const gradient = themeGradients[theme];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className={`bg-gradient-to-r ${gradient} px-6 pt-14 pb-8`}>
        <motion.button
          onClick={onBack}
          className="p-2 rounded-xl bg-white/20"
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-7xl mb-6"
        >
          {emoji}
        </motion.div>
        
        <h1 className="font-heading font-bold text-2xl text-gray-900 mb-3 text-center">
          {title}
        </h1>
        
        <p className="text-gray-600 font-body text-center mb-8 max-w-xs">
          {description}
        </p>

        <motion.button
          onClick={onStart}
          className={`bg-gradient-to-r ${gradient} text-white py-4 px-8 rounded-2xl font-heading font-bold text-lg shadow-lg`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Mulai! 🎮
        </motion.button>
      </div>
    </div>
  );
}

export default GameStartScreen;
