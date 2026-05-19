import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function ConsultationInfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
    >
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white font-heading font-semibold text-base">
            Dukungan Lengkap untuk Anak
          </h3>
          <p className="text-purple-100 text-sm font-body">
            Panduan dan konsultasi profesional dalam satu tempat
          </p>
        </div>
      </div>
    </motion.div>
  );
}
