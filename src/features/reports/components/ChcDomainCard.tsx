import React from 'react';
import { motion } from 'motion/react';
import { Target, ChevronRight, Brain, LucideIcon } from 'lucide-react';
import CircularProgress, { getColorClasses } from './CircularProgress';

interface ChcDomain {
  chcCode: string;
  category: string;
  categoryIndonesian: string;
  color: string;
  testId: string;
  icon: LucideIcon;
  description: string;
  keyDomain: string;
  narrowAbilities: string[];
  developmentLevel: string;
  cognitiveImportance: string;
  ageRange: string;
  score?: number;
  completedDate?: string;
  narrowAbilityScores?: Record<string, number>;
  gamePerformance?: {
    averageScore: number;
    totalPlayed: number;
    lastPlayed: string;
  };
}

interface ChcChartData {
  narrowAbility: string;
  score: number;
  target: number;
  description: string;
}

interface ChcDomainCardProps {
  domain: ChcDomain;
  domainIndex: number;
  chcChartData?: ChcChartData[];
  navigateTo: (screen: string) => void;
}

export default function ChcDomainCard({
  domain,
  domainIndex,
  chcChartData,
  navigateTo,
}: ChcDomainCardProps) {
  const colorClasses = getColorClasses(domain.color);
  const IconComponent = domain.icon;
  const developmentScore = domain.score || Math.random() * 40 + 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: domainIndex * 0.15 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-200/50 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div
            className={`w-14 h-14 ${colorClasses.light} rounded-2xl flex items-center justify-center ${colorClasses.border} border-2`}
          >
            <IconComponent className={`w-7 h-7 ${colorClasses.icon}`} strokeWidth={2} />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <h3 className="text-slate-800 font-heading text-lg">
                {domain.categoryIndonesian}
              </h3>
              <span
                className={`px-2 py-1 rounded-lg text-xs font-medium ${colorClasses.light} ${colorClasses.text} ${colorClasses.border} border`}
              >
                {domain.chcCode}
              </span>
            </div>
            <p className="text-slate-500 text-sm mb-2">{domain.description}</p>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  domain.developmentLevel === 'Sangat Baik'
                    ? 'bg-emerald-100 text-emerald-700'
                    : domain.developmentLevel === 'Baik'
                    ? 'bg-blue-100 text-blue-700'
                    : domain.developmentLevel === 'Sesuai Usia'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                Status: {domain.developmentLevel}
              </span>
              <span className="text-xs text-slate-500">{domain.ageRange}</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <CircularProgress
            percentage={Math.round(developmentScore)}
            color={domain.color}
            size={70}
          />
          <motion.button
            onClick={() => navigateTo(domain.testId)}
            className={`mt-3 ${colorClasses.light} ${colorClasses.text} p-2 rounded-xl border ${colorClasses.border} hover:bg-opacity-80 transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Narrow Abilities */}
      <div className="bg-slate-50/50 rounded-2xl p-4">
        <h4 className="text-slate-700 font-medium text-sm mb-3 flex items-center">
          <Target className="w-4 h-4 mr-2" />
          Narrow Abilities (Kemampuan Spesifik)
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {domain.narrowAbilities.map((ability, abilityIndex) => {
            const abilityScore = Math.random() * 30 + 60;
            return (
              <div
                key={ability}
                className="flex items-center justify-between bg-white/60 rounded-xl p-3"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-700">{ability}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {chcChartData?.[abilityIndex]?.description ||
                      'Kemampuan spesifik dalam domain ini'}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        abilityScore >= 75
                          ? 'bg-emerald-500'
                          : abilityScore >= 60
                          ? 'bg-blue-500'
                          : abilityScore >= 45
                          ? 'bg-amber-500'
                          : 'bg-orange-500'
                      }`}
                      style={{ width: `${Math.min(abilityScore, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600 w-8">
                    {Math.round(abilityScore)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHC Cognitive Importance */}
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Brain className="w-3 h-3 text-blue-600" />
          </div>
          <div>
            <h5 className="text-blue-800 font-medium text-sm mb-1">Relevansi Kognitif</h5>
            <p className="text-blue-700 text-xs leading-relaxed">
              {domain.cognitiveImportance}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export type { ChcDomain, ChcChartData };
