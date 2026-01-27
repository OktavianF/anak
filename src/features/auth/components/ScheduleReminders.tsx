import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageSquare, Clock, ChevronRight } from 'lucide-react';

interface ScheduleRemindersProps {
  childName: string;
}

export const ScheduleReminders: React.FC<ScheduleRemindersProps> = ({ childName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-800 font-heading text-lg">Jadwal & Pengingat Penting</h3>
        <Calendar className="w-5 h-5 text-slate-500" />
      </div>

      <div className="space-y-3">
        {/* Consultation Reminder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-blue-800 font-medium text-sm">Konsultasi Mendatang</h4>
              <p className="text-blue-600 text-xs mt-1">Besok, 15:00 - Dr. Sarah Wijaya</p>
            </div>
            <ChevronRight className="w-4 h-4 text-blue-400" />
          </div>
        </motion.div>

        {/* Assessment Reminder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-amber-800 font-medium text-sm">Pengingat Assessment</h4>
              <p className="text-amber-600 text-xs mt-1">
                {childName} belum melakukan tes hari ini
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
