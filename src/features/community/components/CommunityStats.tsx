import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon, UserCheck, MessageCircle, BookOpen } from 'lucide-react';

interface CommunityStat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

interface CommunityStatsProps {
  stats?: CommunityStat[];
}

const defaultStats: CommunityStat[] = [
  {
    label: 'Anggota Aktif',
    value: '2.8K',
    icon: UserCheck,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-100/50',
  },
  {
    label: 'Diskusi Bulan Ini',
    value: '456',
    icon: MessageCircle,
    color: 'text-blue-400',
    bgColor: 'bg-blue-100/50',
  },
  {
    label: 'Tips Dibagikan',
    value: '89',
    icon: BookOpen,
    color: 'text-amber-400',
    bgColor: 'bg-amber-100/50',
  },
];

export default function CommunityStats({ stats = defaultStats }: CommunityStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
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
  );
}

export type { CommunityStat };
