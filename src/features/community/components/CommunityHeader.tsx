import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users } from 'lucide-react';
import { communityStats } from '../constants/communityStats';

interface CommunityHeaderProps {
  childName: string;
  onBack: () => void;
}

export function CommunityHeader({ childName, onBack }: CommunityHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 px-6 pt-14 pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-12 right-8 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-16 left-12 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-8 right-4 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <motion.button
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20"
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
        </motion.button>
        <div className="text-center">
          <h1 className="text-white font-heading text-xl mb-1">Komunitas Orang Tua</h1>
          <p className="text-white/80 text-sm">Berbagi & belajar bersama</p>
        </div>
        <div className="w-10" />
      </div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 relative z-10"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-heading text-lg mb-1">
              Bersama {childName} & Keluarga Lainnya
            </h2>
            <p className="text-white/80 text-sm">Komunitas yang peduli tumbuh kembang anak</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {communityStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-2`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} strokeWidth={2} />
              </div>
              <div className="text-white font-heading text-lg">{stat.value}</div>
              <div className="text-white/80 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
