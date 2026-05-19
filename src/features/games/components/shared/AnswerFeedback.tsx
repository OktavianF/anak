/**
 * AnswerFeedback - Menampilkan feedback setelah menjawab
 * 
 * Komponen untuk memberikan feedback visual ketika user menjawab benar/salah.
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Sparkles } from 'lucide-react';
import type { AnswerFeedbackProps, FeedbackType } from './types';

export function AnswerFeedback({
  type,
  correctMessage = '🎉 Hebat! Jawaban yang benar!',
  wrongMessage = '❌ Belum tepat! Coba lagi ya!',
  show = true,
}: AnswerFeedbackProps) {
  if (!type || !show) return null;

  const isCorrect = type === 'correct';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10 }}
        className={`p-4 rounded-2xl text-center ${
          isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}
      >
        <motion.div
          className="flex items-center justify-center gap-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {isCorrect ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <p className="font-bold">{isCorrect ? correctMessage : wrongMessage}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * AnswerFeedbackInline - Feedback inline kecil
 */
export function AnswerFeedbackInline({ type }: { type: FeedbackType }) {
  if (!type) return null;

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center ml-2 ${
        type === 'correct' ? 'text-green-500' : 'text-red-500'
      }`}
    >
      {type === 'correct' ? '✓' : '✗'}
    </motion.span>
  );
}

/**
 * SuccessParticles - Efek partikel saat jawaban benar
 */
export function SuccessParticles({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4"
          initial={{
            x: '50%',
            y: '50%',
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 1 + Math.random() * 0.5,
            delay: i * 0.05,
          }}
        >
          {['⭐', '🌟', '✨', '💫', '🎉'][i % 5]}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * ScorePopup - Popup menampilkan skor yang didapat
 */
export function ScorePopup({
  score,
  show,
  position = 'center',
}: {
  score: number;
  show: boolean;
  position?: 'center' | 'top';
}) {
  if (!show) return null;

  return (
    <motion.div
      className={`fixed z-50 ${
        position === 'center' 
          ? 'inset-0 flex items-center justify-center' 
          : 'top-20 left-0 right-0 flex justify-center'
      }`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, y: -50 }}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
        <Sparkles className="w-5 h-5" />
        <span className="font-heading font-bold text-xl">+{score}</span>
      </div>
    </motion.div>
  );
}

export default AnswerFeedback;
