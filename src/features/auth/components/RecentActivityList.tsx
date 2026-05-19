import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, LucideIcon } from 'lucide-react';

interface TestData {
  id: string;
  title: string;
  IconComponent?: LucideIcon;
  bgColor: string;
  progressColor: string;
  score: number | string;
  total: number | string;
  progress: number;
}

interface RecentActivityListProps {
  recentTests: TestData[];
  childName: string;
}

export default function RecentActivityList({ recentTests, childName }: RecentActivityListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-800 font-heading text-lg">Aktivitas Terakhir</h3>
        <Gamepad2 className="w-5 h-5 text-slate-500" />
      </div>
      
      {recentTests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-6 text-center border-2 border-dashed border-slate-200"
        >
          <span className="text-4xl mb-3 block">🎮</span>
          <h4 className="text-slate-700 font-heading font-semibold text-base mb-2">
            Belum ada game assessment yang dimainkan
          </h4>
          <p className="text-slate-500 text-sm">
            Klik "Mulai Petualangan" untuk memulai game-based assessment pertama {childName}!
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {recentTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${test.bgColor} rounded-2xl p-4 shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    {test.IconComponent && (
                      <test.IconComponent className="w-6 h-6 text-gray-700" strokeWidth={2} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-heading font-semibold text-base">
                      {test.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                        <div
                          className={`h-2 ${test.progressColor} rounded-full transition-all duration-500`}
                          style={{ width: `${test.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-900 font-heading font-bold text-lg">
                    {test.score}/{test.total}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
