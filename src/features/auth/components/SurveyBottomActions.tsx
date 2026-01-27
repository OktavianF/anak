import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, SkipForward } from 'lucide-react';

interface SurveyBottomActionsProps {
  showSkipButton: boolean;
  canProceed: boolean;
  isLastStep: boolean;
  onSkip: () => void;
  onNext: () => void;
}

export const SurveyBottomActions: React.FC<SurveyBottomActionsProps> = ({
  showSkipButton,
  canProceed,
  isLastStep,
  onSkip,
  onNext,
}) => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 p-6 space-y-3">
      {/* Skip All Button - Only on first page */}
      {showSkipButton && (
        <motion.button
          onClick={onSkip}
          className="w-full py-3 px-6 rounded-2xl font-body font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <SkipForward className="w-4 h-4" />
            <span>Lewati Semua & Mulai</span>
          </div>
        </motion.button>
      )}

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        disabled={!canProceed}
        className={`w-full py-4 px-6 rounded-2xl font-heading font-bold text-lg transition-all ${
          canProceed
            ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg active:scale-95'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        whileHover={canProceed ? { scale: 1.02 } : {}}
        whileTap={canProceed ? { scale: 0.98 } : {}}
      >
        <div className="flex items-center justify-center space-x-2">
          <span>{isLastStep ? 'Selesai' : 'Next'}</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </motion.button>
    </div>
  );
};
