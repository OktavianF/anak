import React from 'react';
import { motion } from 'motion/react';
import { Award, Trophy, Target, Brain, BarChart3 } from 'lucide-react';

interface ChcRecommendationsProps {
  onViewProgress: () => void;
}

export const ChcRecommendations: React.FC<ChcRecommendationsProps> = ({ onViewProgress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 shadow-xl shadow-emerald-200/30 border border-emerald-200/50 mb-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center border-2 border-emerald-200">
          <Award className="w-5 h-5 text-emerald-600" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-slate-800 font-heading text-lg">Rekomendasi Berbasis CHC</h3>
          <p className="text-slate-500 text-sm">Berdasarkan teori Cattell-Horn-Carroll</p>
        </div>
      </div>

      {/* Cognitive Profile Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-800 font-medium text-sm">Kekuatan Kognitif</span>
          </div>
          <p className="text-slate-700 text-xs">
            Fluid Reasoning (Gf) dan Working Memory (Gsm) menunjukkan perkembangan yang baik
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-amber-600" />
            <span className="text-amber-800 font-medium text-sm">Area Pengembangan</span>
          </div>
          <p className="text-slate-700 text-xs">
            Visual Processing (Gv) dapat ditingkatkan melalui latihan terfokus
          </p>
        </div>
      </div>

      {/* Scientific Recommendation */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/50 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-slate-800 font-medium text-sm mb-2">Rekomendasi Ilmiah CHC</h4>
            <p className="text-slate-700 text-sm leading-relaxed mb-3">
              Berdasarkan analisis profil CHC, fokuskan pada strengthening Visual Processing (Gv)
              melalui aktivitas manipulasi spasial dan puzzle 3D. Fluid Reasoning (Gf) dapat
              dikembangkan dengan problem-solving games yang progressif.
            </p>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-blue-800 text-xs">
                <strong>Validitas Ilmiah:</strong> Rekomendasi ini didasarkan pada teori CHC yang
                telah divalidasi secara empiris untuk asesmen kognitif komprehensif pada anak usia
                5-12 tahun.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid gap-3">
        <motion.button
          onClick={onViewProgress}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-2xl font-medium shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Lihat Progress</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
