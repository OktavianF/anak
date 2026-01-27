import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, SkipForward } from 'lucide-react';

interface SurveyHeaderProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  onBack: () => void;
  onSkip: () => void;
  showBackButton: boolean;
  showSkipButton: boolean;
}

export const SurveyHeader: React.FC<SurveyHeaderProps> = ({
  currentStep,
  totalSteps,
  progress,
  onBack,
  onSkip,
  showBackButton,
  showSkipButton,
}) => {
  return (
    <div className="bg-white px-6 pt-14 pb-4">
      <div className="flex items-center justify-between mb-4">
        {showBackButton ? (
          <motion.button
            onClick={onBack}
            className="p-2 rounded-xl bg-gray-100"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </motion.button>
        ) : (
          <div className="w-10" />
        )}

        <div className="text-center">
          <span className="text-sm font-body text-gray-500">
            {currentStep + 1} dari {totalSteps}
          </span>
        </div>

        {showSkipButton ? (
          <motion.button
            onClick={onSkip}
            className="p-2 rounded-xl bg-blue-100 hover:bg-blue-200 transition-colors"
            whileTap={{ scale: 0.95 }}
            title="Lewati Survei"
          >
            <SkipForward className="w-6 h-6 text-blue-600" />
          </motion.button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-2 bg-orange-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};
