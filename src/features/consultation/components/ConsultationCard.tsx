import React from 'react';
import { motion } from 'motion/react';
import { ConsultationOption } from '../constants/consultationOptions';

interface ConsultationCardProps {
  option: ConsultationOption;
  index: number;
  onAction: () => void;
}

export function ConsultationCard({ option, index, onAction }: ConsultationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div
          className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center shadow-lg`}
        >
          <option.icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900 font-heading font-bold text-xl mb-2">{option.title}</h3>
          <p className="text-gray-600 font-body text-sm leading-relaxed">{option.description}</p>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h4 className="text-gray-700 font-heading font-semibold text-sm mb-3">
          Yang Anda Dapatkan:
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {option.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-600 font-body text-xs">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        onClick={onAction}
        className={`w-full bg-gradient-to-r ${option.color} text-white py-4 px-6 rounded-xl font-heading font-bold text-base shadow-lg`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {option.id === 'parent-guide' ? 'Buka Panduan' : 'Pilih Dokter'}
      </motion.button>
    </motion.div>
  );
}
