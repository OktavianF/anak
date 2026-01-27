import React from 'react';
import { motion } from 'motion/react';
import { Brain, Zap, Sparkles, Play } from 'lucide-react';

interface ChildAssessmentScreenProps {
  navigateTo: (screen: string) => void;
  childName: string;
  isParentMode: boolean;
  setIsParentMode: (mode: boolean) => void;
  chcAssessments?: unknown;
  requestParentAccess?: () => void;
}

export default function ChildAssessmentScreen({
  navigateTo,
  childName,
  requestParentAccess,
}: ChildAssessmentScreenProps) {
  const chcDomains = [
    {
      id: 'fluid-reasoning',
      title: 'Puzzle & Logic',
      subtitle: 'Gf',
      description: 'Ayo berpikir seperti detektif! 🕵️‍♂️',
      icon: '🧩',
      color: 'from-blue-400 via-indigo-500 to-purple-500',
      borderColor: 'border-blue-300',
      shadowColor: 'shadow-blue-300/40',
      gameScreen: 'number-sequence-game',
      childFriendlyTitle: 'Detektif Pintar',
      illustration: (
        <div className="flex items-center justify-center space-x-1 relative">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-6 bg-blue-500 rounded-lg shadow-lg"
          />
          <motion.div
            animate={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="w-6 h-6 bg-pink-500 rounded-lg shadow-lg"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="w-6 h-6 bg-green-500 rounded-lg shadow-lg"
          />
          <motion.div
            animate={{ rotate: [0, 45, 90, 45, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            className="w-6 h-6 bg-yellow-500 rounded-lg shadow-lg"
          />
          <div className="absolute -top-2 -right-2 text-xs">✨</div>
        </div>
      ),
    },
    {
      id: 'comprehension-knowledge',
      title: 'Word Adventure',
      subtitle: 'Gc',
      description: 'Jelajahi dunia kata-kata ajaib! 📚',
      icon: '📖',
      color: 'from-purple-400 via-pink-500 to-rose-500',
      borderColor: 'border-purple-300',
      shadowColor: 'shadow-purple-300/40',
      gameScreen: 'word-puzzle-game',
      childFriendlyTitle: 'Penjelajah Kata',
      illustration: (
        <div className="grid grid-cols-3 gap-1 relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="w-4 h-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg"
          >
            A
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            className="w-4 h-4 bg-gradient-to-br from-pink-400 to-pink-600 rounded border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg"
          >
            B
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg"
          >
            C
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg"
          >
            😊
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg"
          >
            🔍
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg"
          >
            🌟
          </motion.div>
          <div className="absolute -top-2 -right-1 text-xs animate-bounce">📚</div>
        </div>
      ),
    },
    {
      id: 'visual-processing',
      title: 'Magic Eyes',
      subtitle: 'Gv',
      description: 'Lihat dunia dengan mata ajaib! 👁️✨',
      icon: '🐋',
      color: 'from-cyan-400 via-teal-500 to-blue-600',
      borderColor: 'border-cyan-300',
      shadowColor: 'shadow-cyan-300/40',
      gameScreen: 'pattern-recognition-game',
      childFriendlyTitle: 'Mata Ajaib',
      illustration: (
        <div className="flex items-center justify-center relative">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full relative shadow-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1 left-3 w-2 h-1 bg-cyan-200 rounded-full"
            />
            <motion.div
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-1 right-2 w-4 h-3 bg-blue-800 rounded-full"
            />
            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
          </motion.div>
          <div className="absolute -top-3 -right-2 text-lg animate-bounce">👁️</div>
          <div className="absolute -bottom-2 -left-2 text-xs">✨</div>
        </div>
      ),
    },
    {
      id: 'working-memory',
      title: 'Memory Palace',
      subtitle: 'Gsm',
      description: 'Bangun istana memori super kuat! 🏰',
      icon: '🧠',
      color: 'from-emerald-400 via-green-500 to-teal-600',
      borderColor: 'border-emerald-300',
      shadowColor: 'shadow-emerald-300/40',
      gameScreen: 'memory-game',
      childFriendlyTitle: 'Raja Memori',
      illustration: (
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 3, -3, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Brain className="w-14 h-14 text-emerald-600 drop-shadow-lg" strokeWidth={2} />
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full shadow-lg"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full shadow-md"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            className="absolute top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full shadow-md"
          />
          <div className="absolute -top-3 left-3 text-xs animate-bounce">💭</div>
        </div>
      ),
    },
    {
      id: 'long-term-memory',
      title: 'Treasure Vault',
      subtitle: 'Glr',
      description: 'Simpan harta karun di memori! 💎',
      icon: '🏛️',
      color: 'from-amber-400 via-yellow-500 to-orange-600',
      borderColor: 'border-amber-300',
      shadowColor: 'shadow-amber-300/40',
      gameScreen: 'memory-game',
      childFriendlyTitle: 'Penjaga Harta',
      illustration: (
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-10 bg-gradient-to-b from-amber-400 to-yellow-600 rounded-t-lg relative shadow-xl"
          >
            {/* Treasure chest body */}
            <div className="absolute top-1 left-2 right-2 h-2 bg-yellow-300 rounded-sm"></div>
            <div className="absolute top-4 left-1 right-1 h-1 bg-amber-600 rounded-sm"></div>

            {/* Lock */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-800 rounded-full"
            />
          </motion.div>

          {/* Floating treasures */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 -right-2 text-lg"
          >
            💎
          </motion.div>

          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [0, -180, -360],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -top-2 -left-3 text-sm"
          >
            🌟
          </motion.div>

          <motion.div
            animate={{
              y: [0, -5, 0],
              rotate: [0, 90, 180],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-1 -right-3 text-sm"
          >
            🏆
          </motion.div>
        </div>
      ),
    },
    {
      id: 'processing-speed',
      title: 'Speed Racer',
      subtitle: 'Gs',
      description: 'Balap pemikiran super cepat! 🏎️💨',
      icon: '⚡',
      color: 'from-yellow-400 via-orange-500 to-red-500',
      borderColor: 'border-yellow-300',
      shadowColor: 'shadow-yellow-300/40',
      gameScreen: 'number-sequence-game',
      childFriendlyTitle: 'Pembalap Cerdas',
      illustration: (
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Zap
              className="w-14 h-14 text-yellow-600 drop-shadow-lg"
              strokeWidth={3}
              fill="currentColor"
            />
          </motion.div>

          {/* Speed lines */}
          <motion.div
            animate={{
              x: [0, 15, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2 -right-1 w-6 h-1 bg-yellow-400 rounded-full"
          />
          <motion.div
            animate={{
              x: [0, 12, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            className="absolute top-4 -right-1 w-4 h-1 bg-orange-400 rounded-full"
          />
          <motion.div
            animate={{
              x: [0, 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="absolute top-6 -right-1 w-3 h-1 bg-red-400 rounded-full"
          />

          {/* Sparkles */}
          <motion.div
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2 -left-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>

          <div className="absolute -bottom-2 left-2 text-xs animate-bounce">💨</div>
        </div>
      ),
    },
    {
      id: 'auditory-processing',
      title: 'Sound Detective',
      subtitle: 'Ga',
      description: 'Dengarkan petualangan bunyi! 🎧🔍',
      icon: '🎵',
      color: 'from-pink-400 via-rose-500 to-purple-600',
      borderColor: 'border-pink-300',
      shadowColor: 'shadow-pink-300/40',
      gameScreen: 'word-puzzle-game',
      childFriendlyTitle: 'Detektif Suara',
      illustration: (
        <div className="flex items-center justify-center space-x-1 relative">
          <motion.div
            animate={{
              scaleY: [1, 1.8, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2 h-4 bg-gradient-to-t from-pink-500 to-pink-300 rounded-full shadow-md"
          />
          <motion.div
            animate={{
              scaleY: [1, 2.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            className="w-2 h-6 bg-gradient-to-t from-rose-500 to-rose-300 rounded-full shadow-md"
          />
          <motion.div
            animate={{
              scaleY: [1, 2.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="w-2 h-8 bg-gradient-to-t from-purple-500 to-purple-300 rounded-full shadow-md"
          />
          <motion.div
            animate={{
              scaleY: [1, 2.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="w-2 h-6 bg-gradient-to-t from-rose-500 to-rose-300 rounded-full shadow-md"
          />
          <motion.div
            animate={{
              scaleY: [1, 1.8, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="w-2 h-4 bg-gradient-to-t from-pink-500 to-pink-300 rounded-full shadow-md"
          />

          {/* Sound waves */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0.3, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 border-2 border-pink-300 rounded-full"
          />

          <div className="absolute -top-3 -right-1 text-sm animate-bounce">🎧</div>
          <div className="absolute -bottom-2 -left-2 text-xs">🔊</div>
        </div>
      ),
    },
    {
      id: 'reaction-speed',
      title: 'Quick Ninja',
      subtitle: 'Gt',
      description: 'Jadilah ninja super cepat! ⚡🥷',
      icon: '🥷',
      color: 'from-slate-400 via-gray-600 to-slate-700',
      borderColor: 'border-slate-300',
      shadowColor: 'shadow-slate-300/40',
      gameScreen: 'pattern-recognition-game',
      childFriendlyTitle: 'Ninja Cepat',
      illustration: (
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-12 h-12 bg-gradient-to-b from-slate-600 to-gray-800 rounded-full relative shadow-xl flex items-center justify-center"
          >
            {/* Ninja face */}
            <div className="text-white text-lg">👁️</div>

            {/* Ninja headband */}
            <div className="absolute -top-1 left-1 right-1 h-2 bg-red-500 rounded-t-full"></div>
          </motion.div>

          {/* Speed circles */}
          <motion.div
            animate={{
              scale: [0, 2, 0],
              opacity: [1, 0, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 w-12 h-12 border-2 border-slate-400 rounded-full"
          />

          <motion.div
            animate={{
              scale: [0, 1.5, 0],
              opacity: [1, 0, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="absolute inset-1 w-10 h-10 border-2 border-gray-500 rounded-full"
          />

          {/* Throwing stars */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-3 -right-3 text-sm"
          >
            ⭐
          </motion.div>

          <motion.div
            animate={{
              rotate: [0, -360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            className="absolute -bottom-3 -left-3 text-sm"
          >
            ✨
          </motion.div>

          {/* Speed lines */}
          <motion.div
            animate={{
              x: [-5, 5, -5],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2 -right-6 w-4 h-1 bg-slate-400 rounded-full"
          />
        </div>
      ),
    },
  ];

  const handleDomainClick = (gameScreen: string) => {
    navigateTo(gameScreen);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 relative overflow-hidden"
      style={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {/* Background puzzle pieces decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-10 left-10 transform rotate-12">
          <svg width="60" height="60" viewBox="0 0 60 60" className="text-white">
            <path
              d="M10 10h15v15h-15z M25 10h15v15h-15z M10 25h15v15h-15z M25 25h15v15h-15z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>
        <div className="absolute top-20 right-20 transform -rotate-45">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
            <path
              d="M15 15h20v20h-20z M35 15h20v20h-20z M15 35h20v20h-20z M35 35h20v20h-20z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>
        <div className="absolute bottom-20 left-16 transform rotate-45">
          <svg width="70" height="70" viewBox="0 0 70 70" className="text-white">
            <path
              d="M12 12h18v18h-18z M30 12h18v18h-18z M12 30h18v18h-18z M30 30h18v18h-18z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 transform -rotate-12">
          <svg width="50" height="50" viewBox="0 0 50 50" className="text-white">
            <path
              d="M8 8h12v12h-12z M20 8h12v12h-12z M8 20h12v12h-12z M20 20h12v12h-12z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Child Profile - Left */}
            <motion.button
              initial={{ opacity: 0, x: -20, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              onClick={() => navigateTo('child-profile')}
              className="flex items-center space-x-3 bg-white/25 backdrop-blur-md rounded-3xl p-3 border border-white/40 shadow-xl justify-self-start"
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { type: 'spring', stiffness: 300 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-xl border-3 border-white"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="text-xl">👦</span>
              </motion.div>
              <div className="hidden sm:block">
                <motion.h2
                  className="text-white font-heading text-lg font-bold drop-shadow-lg leading-tight"
                  animate={{
                    textShadow: [
                      '0 0 8px rgba(255,255,255,0.5)',
                      '0 0 12px rgba(255,255,255,0.8)',
                      '0 0 8px rgba(255,255,255,0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {childName}
                </motion.h2>
                <p className="text-white/90 text-xs font-medium">
                  🎂 9 Tahun • Level: Penjelajah 🌟
                </p>
              </div>
            </motion.button>

            {/* Title - Center */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.2,
                type: 'spring',
                stiffness: 150,
                damping: 12,
              }}
              className="text-center justify-self-center"
            >
              <motion.h1
                className="text-white font-heading text-2xl lg:text-3xl mb-1 font-bold drop-shadow-lg leading-tight"
                animate={{
                  scale: [1, 1.02, 1],
                  textShadow: [
                    '0 0 20px rgba(255,255,255,0.5)',
                    '0 0 30px rgba(255,255,255,0.8)',
                    '0 0 20px rgba(255,255,255,0.5)',
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Ayo Mulai Petualangannya!
              </motion.h1>
              <motion.p
                className="text-white/95 text-sm lg:text-base font-medium leading-tight"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              ></motion.p>
            </motion.div>

            {/* Parent Mode Button - Right */}
            <motion.button
              initial={{ opacity: 0, x: 20, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              onClick={() => {
                requestParentAccess?.();
              }}
              className="flex items-center space-x-2 bg-white/25 backdrop-blur-md rounded-3xl p-3 border border-white/40 hover:bg-white/35 transition-all duration-300 shadow-xl justify-self-end"
              whileHover={{
                scale: 1.05,
                rotate: -2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
              whileTap={{ scale: 0.95, rotate: 2 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full flex items-center justify-center shadow-lg border-3 border-white"
                animate={{
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <span className="text-lg">👩</span>
              </motion.div>
              <div className="text-left hidden sm:block">
                <span className="text-white font-bold text-sm block leading-tight">Orang Tua</span>
                <span className="text-white/80 text-xs leading-tight">Mode Dewasa</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* CHC Domain Cards */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {chcDomains.map((domain, index) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 30, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.15 + 0.3,
                type: 'spring',
                stiffness: 100,
                damping: 12,
              }}
              className="group cursor-pointer"
              onClick={() => handleDomainClick(domain.gameScreen)}
              whileHover={{
                scale: 1.08,
                y: -8,
                rotate: Math.random() * 6 - 3,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              whileTap={{
                scale: 0.92,
                rotate: Math.random() * 10 - 5,
                transition: { duration: 0.1 },
              }}
            >
              <div
                className={`bg-white rounded-3xl p-4 shadow-2xl ${domain.shadowColor} border-4 ${domain.borderColor} h-56 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-3xl`}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-15`}
                  animate={{
                    opacity: [0.15, 0.25, 0.15],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.5,
                  }}
                />

                {/* Floating sparkles */}
                <motion.div
                  className="absolute top-2 right-2 text-yellow-400 text-lg"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.3,
                  }}
                >
                  ✨
                </motion.div>

                <motion.div
                  className="absolute bottom-2 left-2 text-pink-400 text-sm"
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, -180, -360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.4,
                  }}
                >
                  💫
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Illustration */}
                  <motion.div
                    className="mb-3"
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.3 },
                    }}
                  >
                    {domain.illustration}
                  </motion.div>

                  {/* Child-friendly title */}
                  <motion.h3
                    className="font-heading text-lg text-slate-800 mb-1 group-hover:text-slate-900 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {domain.childFriendlyTitle || domain.title}
                  </motion.h3>

                  {/* CHC Code Badge */}
                  <motion.div
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${domain.color} mb-2 shadow-lg`}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    }}
                  >
                    {domain.subtitle}
                  </motion.div>

                  {/* Fun description */}
                  <motion.p
                    className="text-slate-600 text-sm group-hover:text-slate-700 transition-colors leading-relaxed"
                    whileHover={{ scale: 1.02 }}
                  >
                    {domain.description}
                  </motion.p>
                </div>

                {/* Animated border glow */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl border-2 ${domain.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  animate={{
                    borderColor: ['currentColor', 'transparent', 'currentColor'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Play button indicator */}
                <motion.div
                  className="absolute top-3 left-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="w-4 h-4 text-green-600" fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom encouragement */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 150 }}
        className="text-center mt-6 mb-6"
      >
        <motion.div
          className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 mx-6 border border-white/50 shadow-2xl relative overflow-hidden"
          animate={{
            scale: [1, 1.02, 1],
            boxShadow: [
              '0 10px 30px rgba(0,0,0,0.1)',
              '0 15px 40px rgba(0,0,0,0.15)',
              '0 10px 30px rgba(0,0,0,0.1)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Floating decorations */}
          <motion.div
            className="absolute top-2 left-4 text-2xl"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🏆
          </motion.div>

          <motion.div
            className="absolute top-2 right-4 text-2xl"
            animate={{
              y: [0, -6, 0],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            🎯
          </motion.div>

          <motion.div
            className="absolute bottom-2 left-6 text-xl"
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            💡
          </motion.div>

          <motion.div
            className="absolute bottom-2 right-6 text-xl"
            animate={{
              y: [0, -7, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          >
            ⭐
          </motion.div>

          <motion.p
            className="text-white font-heading text-xl mb-3 font-bold drop-shadow-lg"
            animate={{
              textShadow: [
                '0 0 10px rgba(255,255,255,0.5)',
                '0 0 20px rgba(255,255,255,0.8)',
                '0 0 10px rgba(255,255,255,0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🌟 Setiap latihan membuat kamu jadi SUPERHERO! 🦸‍♂️
          </motion.p>

          <motion.p
            className="text-white/95 text-base font-medium leading-relaxed"
            animate={{
              scale: [1, 1.01, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Pilih petualangan seru di atas dan tunjukkan kehebatanmu! 🚀✨
          </motion.p>

          {/* Animated progress indicators */}
          <motion.div
            className="flex justify-center space-x-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-yellow-300 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
