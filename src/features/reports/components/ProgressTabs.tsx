import React from 'react';
import { motion } from 'motion/react';
import { Target, Calendar, TrendingUp, LucideIcon } from 'lucide-react';

type TabId = 'current' | 'weekly' | 'charts';

interface Tab {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

interface ProgressTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: Tab[] = [
  { id: 'current', label: 'Saat Ini', icon: Target },
  { id: 'weekly', label: 'Mingguan', icon: Calendar },
  { id: 'charts', label: 'Analisis', icon: TrendingUp },
];

export default function ProgressTabs({ activeTab, onTabChange }: ProgressTabsProps) {
  return (
    <div className="flex bg-slate-100/80 rounded-2xl p-1.5 backdrop-blur-sm">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
            activeTab === tab.id
              ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-500/10'
              : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
          }`}
          whileTap={{ scale: 0.98 }}
        >
          <tab.icon size={16} strokeWidth={2} />
          <span>{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

export type { TabId };
