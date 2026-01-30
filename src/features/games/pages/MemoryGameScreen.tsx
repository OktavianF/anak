import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Star,
  CheckCircle,
  Zap,
  Heart,
  Sparkles,
  Crown,
} from 'lucide-react';
import { useGameAssessment } from '../hooks/useGameAssessment';

interface MemoryGameScreenProps {
  navigateTo: (screen: string) => void;
  addSticker: (sticker: string) => void;
  updateGameAssessment: (gameType: string, sessionData: any) => void;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGameScreen({
  navigateTo,
  addSticker,
  updateGameAssessment,
}: MemoryGameScreenProps) {
  // Use the game assessment hook for proper CHC-based scoring
  const { calculateAssessment } = useGameAssessment();
  
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Card emojis for the memory game - only 3 pairs for easy mode
  const cardEmojis = ['🐱', '🐶', '🐸'];
  // Difficulty is always 'easy' now
  const difficulty: 'easy' = 'easy';
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [errors, setErrors] = useState(0);
  const [gameCompletionHandled, setGameCompletionHandled] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [wrongPair, setWrongPair] = useState<number[]>([]);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [lastMatchTime, setLastMatchTime] = useState(Date.now());

  useEffect(() => {
    if (!gameStarted) {
      // Only 3 pairs for easy mode
      const selectedEmojis = cardEmojis.slice(0, 3); // 3 unique emojis
      const pairedEmojis = [...selectedEmojis, ...selectedEmojis]; // 6 cards
      const gameCards = pairedEmojis.map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
      // Shuffle cards using Fisher-Yates algorithm
      const shuffledCards = [...gameCards];
      for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
      }
      setCards(shuffledCards);
      setFlippedCards([]);
      setMatchedPairs(0);
      setMoves(0);
      setGameCompleted(false);
      setStreak(0);
      setErrors(0);
      setGameCompletionHandled(false);
      setComboMultiplier(1);
    }
  }, [gameStarted, difficulty]);

  const handleCardClick = useCallback(
    (cardId: number) => {
      // Prevent clicking if already 2 cards flipped or card is already matched/flipped
      if (flippedCards.length === 2) return;
      if (flippedCards.includes(cardId)) return;

      const clickedCard = cards.find((card) => card.id === cardId);
      if (!clickedCard || clickedCard.isMatched) return;

      const newFlippedCards = [...flippedCards, cardId];
      setFlippedCards(newFlippedCards);

      // Flip the card
      setCards((prev) =>
        prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card))
      );

      // Check for match when 2 cards are flipped
      if (newFlippedCards.length === 2) {
        setMoves((prev) => prev + 1);

        const [firstCardId, secondCardId] = newFlippedCards;
        const firstCard = cards.find((card) => card.id === firstCardId);
        const secondCard = cards.find((card) => card.id === secondCardId);

        if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
          // Match found! 🎉
          const currentTime = Date.now();
          const timeDiff = currentTime - lastMatchTime;

          // Increase combo if match within 3 seconds
          if (timeDiff < 3000 && streak > 0) {
            setComboMultiplier((prev) => Math.min(prev + 0.5, 3));
          } else {
            setComboMultiplier(1);
          }
          setLastMatchTime(currentTime);

          setShowParticles(true);
          setTimeout(() => setShowParticles(false), 1000);

          setStreak((prev) => {
            const newStreak = prev + 1;
            if (newStreak > bestStreak) {
              setBestStreak(newStreak);
            }
            return newStreak;
          });

          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === firstCardId || card.id === secondCardId
                  ? { ...card, isMatched: true, isFlipped: true }
                  : card
              )
            );
            setMatchedPairs((prev) => prev + 1);
            setFlippedCards([]);
          }, 800);
        } else {
          // No match - flip cards back with shake effect
          setStreak(0); // Reset streak on miss
          setComboMultiplier(1);
          setErrors((prev) => prev + 1); // Count errors for assessment
          setWrongPair([firstCardId, secondCardId]);

          setTimeout(() => {
            setWrongPair([]);
            setCards((prev) =>
              prev.map((card) =>
                card.id === firstCardId || card.id === secondCardId
                  ? { ...card, isFlipped: false }
                  : card
              )
            );
            setFlippedCards([]);
          }, 1200);
        }
      }
    },
    [flippedCards, cards, streak, bestStreak, lastMatchTime]
  );

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !gameCompleted) {
      interval = setInterval(() => {
        setGameTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, gameCompleted]);

  useEffect(() => {
    const cardCount = 3; // 3 pairs for easy mode
    if (matchedPairs === cardCount && matchedPairs > 0 && !gameCompletionHandled) {
      setIsTimerRunning(false);
      setGameCompleted(true);
      setGameCompletionHandled(true);

      // Calculate accuracy based on errors vs moves
      const accuracy = Math.max(0, Math.round(((moves - errors) / moves) * 100));

      // Use the new CHC-based assessment system for Working Memory (Gsm)
      const assessmentResult = calculateAssessment('memory', {
        // Base parameters
        accuracy: accuracy,
        completionTime: gameTime,
        errors: errors,
        attempts: moves,
        difficulty: difficulty,
        
        // Working Memory specific parameters (Gsm)
        memoryCapacity: matchedPairs, // Number of pairs remembered
        sequenceAccuracy: accuracy,
        recallDelay: 800, // Card flip delay in ms
        orderErrors: 0, // Not applicable for this game
        itemErrors: errors,
        longestStreak: bestStreak,
        maxCombo: comboMultiplier,
      });

      // Update assessment data with new format
      const sessionData = {
        // Legacy fields for backward compatibility
        timeSpent: gameTime,
        errors: errors,
        score: assessmentResult.finalScore,
        difficulty: difficulty,
        moves: moves,
        stars: assessmentResult.starRating,
        timestamp: assessmentResult.timestamp,
        
        // New CHC-based fields
        domain: assessmentResult.domain, // 'Gsm' for Working Memory
        finalScore: assessmentResult.finalScore,
        starRating: assessmentResult.starRating,
        developmentLevel: assessmentResult.developmentLevel,
        feedback: assessmentResult.feedback,
        parentRecommendation: assessmentResult.parentRecommendation,
        scoreBreakdown: assessmentResult.scoreBreakdown,
        
        // Working Memory specific metrics
        memoryCapacity: matchedPairs,
        longestStreak: bestStreak,
        maxCombo: comboMultiplier,
        accuracy: accuracy,
        
        // Legacy domain names (for old UI)
        domains: ['Memori Kerja (Gsm)', 'Konsentrasi', 'Memori Jangka Pendek'],
      };

      updateGameAssessment('memory', sessionData);
      addSticker('memory-master');
    }
  }, [matchedPairs, difficulty, gameCompletionHandled, calculateAssessment, bestStreak, comboMultiplier]);

  const resetGame = () => {
    setGameStarted(false);
    setIsTimerRunning(false);
    setGameTime(0);
    setGameCompletionHandled(false);
    setTimeout(() => {
      setGameStarted(true);
      setIsTimerRunning(true);
    }, 100);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameTime(0);
    setIsTimerRunning(true);
  };

  const getStarRating = (moves: number, timeInSeconds: number) => {
    const timeScore = difficulty === 'easy' ? 60 : difficulty === 'medium' ? 120 : 180;
    const moveScore = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;

    // Calculate score based on both time and moves
    if (moves <= moveScore && timeInSeconds <= timeScore) return 3;
    if (moves <= moveScore + 5 && timeInSeconds <= timeScore + 30) return 2;
    return 1;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = (
    stars: number,
    timeInSeconds: number,
    errors: number,
    difficulty: string
  ) => {
    const baseScore = stars * 30; // 30, 60, or 90

    // Time bonus (faster = better)
    const timeTarget = difficulty === 'easy' ? 60 : difficulty === 'medium' ? 120 : 180;
    const timeBonus = Math.max(0, Math.floor((timeTarget - timeInSeconds) / 10)) * 2;

    // Error penalty
    const errorPenalty = errors * 5;

    // Difficulty multiplier
    const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.2 : 1.5;

    return Math.round(Math.max(10, (baseScore + timeBonus - errorPenalty) * difficultyMultiplier));
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Luar Biasa', color: 'text-purple-600', bg: 'bg-purple-50' };
    if (score >= 70) return { level: 'Sangat Baik', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (score >= 50) return { level: 'Baik', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 30) return { level: 'Cukup', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Perlu Latihan', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  const getStreakMessage = () => {
    if (streak >= 5) return { text: 'AMAZING! 🔥', emoji: '🔥', color: 'text-red-500' };
    if (streak >= 3) return { text: 'Streak Mantap! ⚡', emoji: '⚡', color: 'text-yellow-500' };
    if (streak >= 2) return { text: 'Keep Going! ✨', emoji: '✨', color: 'text-blue-500' };
    return null;
  };

  if (gameCompleted) {
    const stars = getStarRating(moves, gameTime);
    const score = calculateScore(stars, gameTime, errors, difficulty);
    const performance = getPerformanceLevel(score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center overflow-hidden relative">
        {/* Floating celebration elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ y: '100vh', x: Math.random() * window.innerWidth, opacity: 0 }}
            animate={{
              y: '-20vh',
              x: Math.random() * window.innerWidth,
              opacity: [0, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 3,
            }}
          >
            {['🎉', '🎊', '⭐', '✨', '🌟', '💫', '🎈', '🏆'][i % 8]}
          </motion.div>
        ))}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl relative z-10"
        >
          <motion.div
            animate={{
              scale: [1, 1.2],
              rotate: [0, 10],
              y: [0, -10],
            }}
            transition={{ duration: 0.8, repeat: 3, repeatType: 'reverse' }}
            className="text-8xl mb-4 relative"
          >
            🎉
            {/* Confetti particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: [
                    '#FFD700',
                    '#FF69B4',
                    '#00CED1',
                    '#32CD32',
                    '#FF6347',
                    '#9370DB',
                    '#FFA500',
                    '#DC143C',
                    '#FF1493',
                    '#00FF00',
                    '#FF8C00',
                    '#4169E1',
                  ][i],
                  left: `${10 + i * 8}%`,
                  top: `${20 + (i % 3) * 15}%`,
                }}
                animate={{
                  y: [0, -60, 40],
                  x: [0, (i - 6) * 25, 0],
                  rotate: [0, 720],
                  scale: [1, 2, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}
          </motion.div>

          <motion.h2
            className="text-gray-900 font-heading font-bold text-2xl mb-2"
            animate={{ scale: [1, 1.05] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          >
            Hebat Sekali! 🏆
          </motion.h2>
          <p className="text-gray-600 font-body text-base mb-4">
            Kamu berhasil mencocokkan semua kartu!
          </p>

          {/* Stars with animation */}
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3].map((star) => (
              <motion.div
                key={star}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.5 + star * 0.2,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= stars ? 'text-yellow-400 fill-current' : 'text-gray-200'
                  }`}
                />
              </motion.div>
            ))}
          </div>

          {/* Assessment Results */}
          <motion.div
            className={`${performance.bg} rounded-2xl p-4 mb-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-heading font-bold ${performance.color}`}>Assessment Result</h3>
              <motion.span
                className={`font-heading font-bold text-lg ${performance.color}`}
                animate={{ scale: [1, 1.2] }}
                transition={{ duration: 0.5, repeat: 3, repeatType: 'reverse', delay: 1.2 }}
              >
                {score}
              </motion.span>
            </div>
            <div className={`${performance.color} font-body text-sm space-y-1`}>
              <p>
                Performance: <span className="font-bold">{performance.level}</span>
              </p>
              <p>
                Domain: <span className="font-bold">Konsentrasi & Memori</span>
              </p>
              <p>
                Tingkat:{' '}
                <span className="font-bold">
                  {difficulty === 'easy' ? 'Mudah' : difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                </span>
              </p>
            </div>
          </motion.div>

          {/* Detailed Stats */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-6 border-2 border-purple-200">
            <div className="text-purple-700 font-body text-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">🎯 Gerakan:</span>
                <span className="font-bold">{moves}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">⏱️ Waktu:</span>
                <span className="font-bold">{formatTime(gameTime)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">❌ Kesalahan:</span>
                <span className="font-bold">{errors}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">🔥 Best Streak:</span>
                <span className="font-bold">{bestStreak}</span>
              </div>
              <div className="border-t-2 border-purple-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-1">💯 Skor Akhir:</span>
                  <span className="font-bold text-purple-800">{score}/100</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-4 mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <span className="text-yellow-700 font-body font-semibold">Hadiah Diperoleh! 🎁</span>
            </div>
            <p className="text-yellow-600 font-body text-sm">
              Stiker "Memory Master" ditambahkan ke koleksimu!
            </p>
          </motion.div>

          <div className="flex space-x-3">
            <motion.button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-2xl font-heading font-bold shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Main Lagi 🎮
            </motion.button>
            <motion.button
              onClick={() => navigateTo('game')}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-4 rounded-2xl font-heading font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kembali 🏠
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {/* Floating background elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {['🧠', '💡', '⭐', '🎯', '🌈', '✨', '🎨', '🦄'][i]}
          </motion.div>
        ))}

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 px-6 pt-14 pb-8 relative overflow-hidden">
          {/* Animated background shapes */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full"
            animate={{ scale: [1, 1.3, 1], x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full"
            animate={{ scale: [1, 1.2, 1], x: [0, -15, 0], y: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="flex items-center justify-between mb-6 relative z-10">
            <motion.button
              onClick={() => navigateTo('game')}
              className="p-2 rounded-xl bg-white/20 backdrop-blur-sm"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </motion.button>
            <motion.h1
              className="text-white font-heading font-bold text-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Memory Cards 🃏
            </motion.h1>
            <div className="w-10" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/20 backdrop-blur-md rounded-2xl p-5 border-2 border-white/30 relative z-10"
          >
            <motion.h2
              className="text-white font-heading font-semibold text-lg mb-2 flex items-center gap-2"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Siap untuk Tantangan? 🧠✨
            </motion.h2>
            <p className="text-purple-100 font-body text-sm">
              Cocokkan kartu yang sama dan asah daya ingatmu!
            </p>
          </motion.div>
        </div>

        {/* Game Instructions */}
        <div className="px-6 -mt-4 pb-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg mb-6 border-2 border-purple-100"
          >
            <h3 className="text-gray-900 font-heading font-bold text-lg mb-4 flex items-center gap-2">
              📖 Cara Bermain:
            </h3>
            <div className="space-y-3">
              {[
                { num: 1, text: 'Klik kartu untuk membaliknya', emoji: '👆' },
                { num: 2, text: 'Cocokkan 2 kartu dengan gambar yang sama', emoji: '🎯' },
                { num: 3, text: 'Selesaikan dengan gerakan sesedikit mungkin', emoji: '⚡' },
              ].map((item, index) => (
                <motion.div
                  key={item.num}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-md"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white font-bold">{item.num}</span>
                  </motion.div>
                  <p className="text-gray-600 font-body text-sm flex-1">
                    {item.text} {item.emoji}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Target Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 border-2 border-yellow-300 rounded-2xl p-6 mb-6 shadow-lg"
          >
            <h3 className="text-orange-700 font-heading font-bold text-base mb-3 flex items-center gap-2">
              🎯 Target Bintang
            </h3>
            <div className="space-y-2">
              {[
                {
                  stars: '⭐⭐⭐',
                  req:
                    difficulty === 'easy'
                      ? '≤ 10 gerakan & 1 menit'
                      : difficulty === 'medium'
                      ? '≤ 15 gerakan & 2 menit'
                      : '≤ 20 gerakan & 3 menit',
                },
                {
                  stars: '⭐⭐',
                  req:
                    difficulty === 'easy'
                      ? '≤ 15 gerakan & 1.5 menit'
                      : difficulty === 'medium'
                      ? '≤ 20 gerakan & 2.5 menit'
                      : '≤ 25 gerakan & 3.5 menit',
                },
                { stars: '⭐', req: 'Selesaikan game' },
              ].map((target, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between bg-white/50 rounded-xl p-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-orange-600 font-body text-sm">{target.stars}</span>
                  <span className="text-orange-600 font-body text-sm font-bold">{target.req}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-heading font-bold text-lg shadow-2xl relative overflow-hidden"
            whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(168, 85, 247, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <span className="relative z-10">Mulai Permainan! 🎮✨</span>
          </motion.button>
        </div>
      </div>
    );
  }

  const streakMessage = getStreakMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 relative overflow-hidden">
      {/* Animated background particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Match particles explosion */}
      <AnimatePresence>
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  rotate: Math.random() * 720,
                  opacity: [1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                {['✨', '⭐', '💫', '🌟', '💥', '🎉'][i % 6]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 px-6 pt-14 pb-6 shadow-xl relative overflow-hidden">
        {/* Animated header decoration */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <motion.button
            onClick={() => navigateTo('game')}
            className="p-2 rounded-xl bg-white/20 backdrop-blur-sm"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <motion.h1
            className="text-white font-heading font-bold text-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Memory Cards 🃏
          </motion.h1>
          <motion.button
            onClick={resetGame}
            className="p-2 rounded-xl bg-white/20 backdrop-blur-sm"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05, rotate: 180, backgroundColor: 'rgba(255,255,255,0.3)' }}
            transition={{ duration: 0.3 }}
          >
            <RotateCcw className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Game Stats */}
        <motion.div
          className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border-2 border-white/30 shadow-2xl relative z-10"
          animate={{
            boxShadow: [
              '0 10px 30px rgba(0,0,0,0.1)',
              '0 15px 40px rgba(0,0,0,0.2)',
              '0 10px 30px rgba(0,0,0,0.1)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center justify-between">
            <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
              <motion.span
                className="text-white font-heading font-bold text-lg block"
                key={moves}
                initial={{ scale: 1.5, color: '#FFD700' }}
                animate={{ scale: 1, color: '#FFFFFF' }}
              >
                {moves}
              </motion.span>
              <p className="text-purple-100 font-body text-xs">🎯 Gerakan</p>
            </motion.div>
            <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
              <span className="text-white font-heading font-bold text-lg block">
                {formatTime(gameTime)}
              </span>
              <p className="text-purple-100 font-body text-xs">⏱️ Waktu</p>
            </motion.div>
            <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
              <motion.span
                className="text-white font-heading font-bold text-lg block"
                key={matchedPairs}
                initial={{ scale: 1.3, color: '#FFD700' }}
                animate={{ scale: 1, color: '#FFFFFF' }}
              >
                {matchedPairs}/3
              </motion.span>
              <p className="text-purple-100 font-body text-xs">💝 Pasangan</p>
            </motion.div>
            <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
              <div className="flex space-x-1 justify-center">
                {[1, 2, 3].map((star) => (
                  <motion.div
                    key={star}
                    animate={star <= getStarRating(moves, gameTime) ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= getStarRating(moves, gameTime)
                          ? 'text-yellow-300 fill-current'
                          : 'text-white/30'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-purple-100 font-body text-xs">⭐ Target</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Streak Indicator */}
      <AnimatePresence>
        {streakMessage && (
          <motion.div
            className="fixed top-32 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ scale: 0, y: -50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div
              className={`bg-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-2 border-3 ${
                streak >= 5
                  ? 'border-red-400'
                  : streak >= 3
                  ? 'border-yellow-400'
                  : 'border-blue-400'
              }`}
            >
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, 15], scale: [1, 1.2] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              >
                {streakMessage.emoji}
              </motion.span>
              <span className={`font-heading font-bold ${streakMessage.color}`}>
                {streakMessage.text}
              </span>
              {comboMultiplier > 1 && (
                <motion.span
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  x{comboMultiplier.toFixed(1)}
                </motion.span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Board */}
      <div className="px-4 py-6 relative z-10">
        <div
          className={`grid gap-3 max-w-md mx-auto ${
            difficulty === 'easy'
              ? 'grid-cols-3'
              : difficulty === 'medium'
              ? 'grid-cols-4'
              : 'grid-cols-5'
          }`}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="aspect-square relative"
              style={{ perspective: '1000px' }}
              whileHover={{
                scale: card.isMatched ? 1.02 : 1.08,
                zIndex: 10,
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{
                opacity: 1,
                scale: wrongPair.includes(card.id) ? [1, 0.9] : 1,
                x: wrongPair.includes(card.id) ? [-5, 5] : 0,
              }}
              transition={{
                delay: card.id * 0.05,
                type: 'spring',
                stiffness: 260,
                damping: 20,
                x: { duration: 0.3 },
              }}
            >
              <motion.button
                onClick={() => handleCardClick(card.id)}
                className="w-full h-full"
                disabled={
                  card.isMatched || flippedCards.includes(card.id) || flippedCards.length === 2
                }
                whileTap={{
                  scale: card.isMatched ? 1 : 0.95,
                }}
              >
                <motion.div
                  className={`w-full h-full rounded-2xl border-3 shadow-lg ${
                    card.isMatched
                      ? 'bg-gradient-to-br from-emerald-300 via-green-300 to-teal-300 border-emerald-500'
                      : card.isFlipped
                      ? 'bg-gradient-to-br from-white to-gray-50 border-purple-400 shadow-2xl'
                      : 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 border-purple-500'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                >
                  {/* Front (emoji side) */}
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <motion.span
                      className={`text-6xl ${card.isMatched ? 'drop-shadow-lg' : ''}`}
                      animate={card.isMatched ? { scale: [1, 1.2], rotate: [0, 360] } : {}}
                      transition={{ duration: 0.5, repeat: 1, repeatType: 'reverse' }}
                    >
                      {card.emoji}
                    </motion.span>
                  </div>

                  {/* Back (question mark side) */}
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <motion.div
                      className="text-white text-4xl relative"
                      animate={{
                        scale: [1, 1.1],
                        rotate: [0, 5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      ❓{/* Sparkle decoration on card back */}
                      <motion.div
                        className="absolute -top-1 -right-1 text-yellow-300 text-sm"
                        animate={{
                          scale: [0, 1],
                          rotate: [0, 180],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ✨
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.button>

              {/* Matched card effects */}
              {card.isMatched && (
                <>
                  <motion.div
                    className="absolute top-2 right-2 z-20"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-700 drop-shadow-md" />
                  </motion.div>

                  {/* Sparkles around matched card */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      style={{
                        left: `${20 + Math.cos((i * 60 * Math.PI) / 180) * 40}%`,
                        top: `${50 + Math.sin((i * 60 * Math.PI) / 180) * 40}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.4 + i * 0.1,
                        repeat: 2,
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress indicator with fun design */}
        <motion.div
          className="mt-6 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between text-sm text-purple-700 mb-2 font-heading font-bold">
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Progress
            </span>
            <motion.span
              key={matchedPairs}
              initial={{ scale: 1.5, color: '#FFD700' }}
              animate={{ scale: 1, color: '#7C3AED' }}
            >
              {matchedPairs}/3
            </motion.span>
          </div>
          <div className="w-full h-4 bg-white/50 rounded-full overflow-hidden border-2 border-purple-300 shadow-inner relative">
            <motion.div
              className="h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{
                width: `${(matchedPairs / 3) * 100}%`,
                backgroundPosition: ['0% 50%', '100% 50%'],
              }}
              transition={{
                width: { duration: 0.5, ease: 'easeOut' },
                backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
            {/* Progress stars */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 transform -translate-y-1/2 text-xs"
                style={{ left: `${(i + 0.5) * (100 / 3)}%` }}
                animate={i < matchedPairs ? { scale: [1, 1.5, 1], rotate: [0, 360] } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {i < matchedPairs ? '⭐' : '○'}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun encouragement text */}
        <motion.div
          className="text-center mt-4"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-purple-700 font-heading font-bold">
            {matchedPairs === 0
              ? '🎮 Ayo mulai!'
              : matchedPairs < 2
              ? '💪 Kamu bisa!'
              : matchedPairs < 3
              ? '🔥 Hampir selesai!'
              : '🏆 Tinggal sedikit lagi!'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
