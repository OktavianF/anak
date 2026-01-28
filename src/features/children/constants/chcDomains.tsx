import React from 'react';
import {
  FluidReasoningIllustration,
  ComprehensionKnowledgeIllustration,
  VisualProcessingIllustration,
  WorkingMemoryIllustration,
  LongTermMemoryIllustration,
  ProcessingSpeedIllustration,
  AuditoryProcessingIllustration,
  ReactionSpeedIllustration,
} from '../components/domain-illustrations';

export interface ChcDomain {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
  shadowColor: string;
  gameScreen: string;
  childFriendlyTitle: string;
  illustration: React.ReactNode;
}

export const chcDomains: ChcDomain[] = [
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
    illustration: <FluidReasoningIllustration />,
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
    illustration: <ComprehensionKnowledgeIllustration />,
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
    illustration: <VisualProcessingIllustration />,
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
    illustration: <WorkingMemoryIllustration />,
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
    illustration: <LongTermMemoryIllustration />,
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
    illustration: <ProcessingSpeedIllustration />,
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
    illustration: <AuditoryProcessingIllustration />,
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
    illustration: <ReactionSpeedIllustration />,
  },
];
