import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart } from 'lucide-react';

// Local components
import { ConsultationCard } from '../components/ConsultationCard';
import { ConsultationNav } from '../components/ConsultationNav';

// Constants
import { consultationOptions } from '../constants/consultationOptions';

interface ConsultationScreenProps {
  navigateTo: (screen: string, data?: any) => void;
  isParentMode: boolean;
  setIsParentMode?: (mode: boolean) => void;
}

export default function ConsultationScreen({
  navigateTo,
  isParentMode,
  setIsParentMode,
}: ConsultationScreenProps) {
  const handleOptionAction = (optionId: string) => {
    if (optionId === 'parent-guide') {
      navigateTo('parent-guide');
    } else if (optionId === 'doctor-consultation') {
      if (!isParentMode && setIsParentMode) {
        setIsParentMode(true);
      }
      navigateTo('doctor-list');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 pt-14 pb-8 bg-[rgba(218,70,70,0)]">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={() => navigateTo('home')}
            className="p-2 rounded-xl bg-white/20"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-white font-heading font-bold text-xl">Konsultasi & Panduan</h1>
          <div className="w-10" />
        </div>

        {/* Info Card */}
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
      </div>

      {/* Consultation Options */}
      <div className="px-6 -mt-4 pb-24">
        <div className="space-y-6">
          {consultationOptions.map((option, index) => (
            <ConsultationCard
              key={option.id}
              option={option}
              index={index}
              onAction={() => handleOptionAction(option.id)}
            />
          ))}
        </div>
      </div>

      <ConsultationNav navigateTo={navigateTo} activeColor="text-purple-500" />
    </div>
  );
}
