import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  Trophy,
  Coins,
  LogOut,
  Crown,
  Sparkles,
  Gift,
  Zap,
  Heart,
  Settings,
  ArrowLeft,
} from 'lucide-react';

interface ChildProfileScreenProps {
  navigateTo: (screen: string) => void;
  childName: string;
  isParentMode: boolean;
  setIsParentMode: (mode: boolean) => void;
  collectedStickers: string[];
  profileData: any;
  updateProfile: (data: any) => void;
}

export default function ChildProfileScreen({
  navigateTo,
  childName,
  isParentMode,
  setIsParentMode,
  collectedStickers,
  profileData,
  updateProfile,
}: ChildProfileScreenProps) {
  const [showCustomization, setShowCustomization] = useState(false);
  const [currentCoins, setCurrentCoins] = useState(2580); // Virtual currency
  const [selectedCustomization, setSelectedCustomization] = useState('avatar');

  // Avatar customization options
  const avatarOptions = ['👦', '👧', '🧒', '👶', '🐱', '🐶', '🦊', '🐼', '🐸', '🦄', '🐵', '🐨'];
  const outfitOptions = ['👕', '👔', '🦺', '👗', '🎽', '🧥'];
  const hatOptions = ['🎩', '👑', '🧢', '🎓', '👒', '⛑️'];
  const backgroundOptions = [
    { id: 'forest', emoji: '🌲', color: 'from-green-400 to-emerald-600' },
    { id: 'ocean', emoji: '🌊', color: 'from-blue-400 to-cyan-600' },
    { id: 'space', emoji: '🚀', color: 'from-purple-400 to-indigo-600' },
    { id: 'candy', emoji: '🍭', color: 'from-pink-400 to-rose-600' },
    { id: 'rainbow', emoji: '🌈', color: 'from-yellow-400 to-pink-500' },
    { id: 'castle', emoji: '🏰', color: 'from-indigo-400 to-purple-600' },
  ];

  // Achievements/Badges with rarity levels
  const achievements = [
    {
      id: 'memory-master',
      name: 'Memory Master',
      emoji: '🧠',
      rarity: 'legendary',
      earned: true,
      description: 'Ahli Memori Super!',
    },
    {
      id: 'puzzle-genius',
      name: 'Puzzle Genius',
      emoji: '🧩',
      rarity: 'epic',
      earned: true,
      description: 'Penyelesai Puzzle Handal!',
    },
    {
      id: 'speed-runner',
      name: 'Speed Runner',
      emoji: '⚡',
      rarity: 'rare',
      earned: true,
      description: 'Pelari Cepat!',
    },
    {
      id: 'pattern-expert',
      name: 'Pattern Expert',
      emoji: '🎯',
      rarity: 'epic',
      earned: true,
      description: 'Ahli Pola!',
    },
    {
      id: 'word-wizard',
      name: 'Word Wizard',
      emoji: '📚',
      rarity: 'rare',
      earned: true,
      description: 'Penyihir Kata!',
    },
    {
      id: 'number-ninja',
      name: 'Number Ninja',
      emoji: '🔢',
      rarity: 'rare',
      earned: true,
      description: 'Ninja Angka!',
    },
    {
      id: 'brain-champion',
      name: 'Brain Champion',
      emoji: '👑',
      rarity: 'legendary',
      earned: false,
      description: 'Juara Otak!',
    },
    {
      id: 'super-learner',
      name: 'Super Learner',
      emoji: '🌟',
      rarity: 'epic',
      earned: false,
      description: 'Pelajar Super!',
    },
    {
      id: 'creativity-king',
      name: 'Creativity King',
      emoji: '🎨',
      rarity: 'rare',
      earned: false,
      description: 'Raja Kreativitas!',
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-400 to-orange-500';
      case 'epic':
        return 'from-purple-400 to-pink-500';
      case 'rare':
        return 'from-blue-400 to-indigo-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'shadow-yellow-500/50';
      case 'epic':
        return 'shadow-purple-500/50';
      case 'rare':
        return 'shadow-blue-500/50';
      default:
        return 'shadow-gray-500/50';
    }
  };

  const handleSafeExit = () => {
    // Implement parent PIN verification here
    setIsParentMode(true);
    navigateTo('home');
  };

  const purchaseItem = (item: any, cost: number) => {
    if (currentCoins >= cost) {
      setCurrentCoins((prev) => prev - cost);
      updateProfile({ ...profileData, ...item });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500 relative overflow-hidden">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white text-opacity-40"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['⭐', '✨', '🌟', '💫', '🎉', '🎈', '🎁', '🏆'][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      {/* Header with Back Button */}
      <div className="relative z-10 pt-12 pb-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          onClick={() => navigateTo('child-assessment')}
          className="absolute top-4 left-6 w-12 h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.35)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
        </motion.button>

        {/* Avatar and Name */}
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
            onClick={() => setShowCustomization(!showCustomization)}
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
                <span>{profileData.avatar}</span>
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

          {/* Coins Display */}
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
            <span className="text-white font-heading text-xl font-bold">
              {currentCoins.toLocaleString()}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content Tabs */}
      <div className="px-6 pb-20">
        {/* Achievement Gallery */}
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

        {/* Safe Exit Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleSafeExit}
          className="w-full bg-white/25 backdrop-blur-md rounded-3xl p-4 border border-white/40 flex items-center justify-center space-x-3 text-white font-heading text-lg"
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.3)' }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-6 h-6" />
          <span>Kembali</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          ></motion.div>
        </motion.button>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="text-center mb-6">
              <h3 className="text-slate-800 font-heading text-2xl mb-2">🛍️ Avatar Shop 🛍️</h3>
              <div className="flex items-center justify-center space-x-2">
                <Coins className="w-5 h-5 text-yellow-500" />
                <span className="text-slate-600 font-bold">{currentCoins.toLocaleString()}</span>
              </div>
            </div>

            {/* Customization Categories */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { id: 'avatar', name: 'Avatar', emoji: '👤' },
                { id: 'outfit', name: 'Outfit', emoji: '👕' },
                { id: 'hat', name: 'Hat', emoji: '🎩' },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCustomization(category.id)}
                  className={`p-3 rounded-2xl text-center transition-all ${
                    selectedCustomization === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{category.emoji}</div>
                  <div className="text-xs font-medium">{category.name}</div>
                </button>
              ))}
            </div>

            {/* Customization Items */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {(selectedCustomization === 'avatar'
                ? avatarOptions
                : selectedCustomization === 'outfit'
                ? outfitOptions
                : hatOptions
              ).map((item, index) => (
                <button
                  key={index}
                  onClick={() => purchaseItem({ avatar: item }, 100)}
                  className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl hover:scale-105 transition-transform border-2 border-transparent hover:border-purple-300"
                >
                  {item}
                  <div className="absolute bottom-0 right-0 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    100
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowCustomization(false)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-heading font-bold"
            >
              Close Shop
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
