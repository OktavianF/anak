import React from 'react';
import { motion } from 'motion/react';
import { Brain } from 'lucide-react';

interface UserStats {
  name: string;
  level: number;
  score: number;
  cognitiveProfile: string;
  completedTests: number;
  totalTests: number;
  strengths: { domain?: string; score: number; developmentLevel: string }[];
  needsImprovement: { domain?: string; score: number; developmentLevel: string }[];
  overallCognitiveAge: number;
}

interface CognitiveProfileCardProps {
  userStats: UserStats;
}

export default function CognitiveProfileCard({ userStats }: CognitiveProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-500 via-purple-600 to-violet-600 rounded-2xl p-5 text-white shadow-lg shadow-purple-500/20 mb-6 border border-purple-400/20"
    >
      {/* Main Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white/80 text-xs mb-0.5">Profil Kognitif CHC</p>
            <h2 className="font-heading text-lg">{userStats.name}</h2>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-heading mb-0.5">{userStats.score}%</div>
          <p className="text-white/80 text-xs">Indeks Global</p>
        </div>
      </div>

      {/* Quick Stats - Compact Grid */}
      <div className="grid grid-cols-3 gap-3 bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
        <div className="text-center">
          <p className="text-white/80 text-xs mb-1">Terukur</p>
          <p className="text-white font-semibold">{userStats.completedTests}/8</p>
        </div>
        <div className="text-center border-x border-white/30">
          <p className="text-white/80 text-xs mb-1">Kekuatan</p>
          <p className="text-white font-semibold text-sm">
            {userStats.strengths && userStats.strengths[0]
              ? userStats.strengths[0].domain
              : 'Gc'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-white/80 text-xs mb-1">Fokus</p>
          <p className="text-white font-semibold text-sm">
            {userStats.needsImprovement && userStats.needsImprovement[0]
              ? userStats.needsImprovement[0].domain
              : 'Gv'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export type { UserStats };
