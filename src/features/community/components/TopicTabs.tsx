import React from 'react';
import { motion } from 'motion/react';
import { topics } from '../constants/topics';

interface TopicTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TopicTabs({ activeTab, onTabChange }: TopicTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-lg rounded-3xl p-5 shadow-xl shadow-slate-200/50 border border-slate-200/50 mb-6"
    >
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {topics.map((topic) => {
          const IconComponent = topic.icon;
          return (
            <motion.button
              key={topic.id}
              onClick={() => onTabChange(topic.id)}
              className={`flex-shrink-0 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                activeTab === topic.id
                  ? `${topic.bgColor} ${topic.color} border-2 ${topic.borderColor} shadow-lg`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-transparent'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2">
                <IconComponent className="w-4 h-4" strokeWidth={2} />
                <span>{topic.label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
