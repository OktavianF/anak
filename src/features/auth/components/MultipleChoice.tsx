import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface MultipleChoiceProps {
  stepId: string;
  options: string[];
  selectedOptions: string[];
  onOptionToggle: (option: string) => void;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  stepId,
  options,
  selectedOptions,
  onOptionToggle,
}) => {
  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isSelected = selectedOptions.includes(option);
        const uniqueKey = `${stepId}-option-${index}-${option.replace(/\s+/g, '-').toLowerCase()}`;

        return (
          <motion.button
            key={uniqueKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onOptionToggle(option)}
            className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
              isSelected
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-body text-gray-900 leading-relaxed">{option}</span>
              {isSelected && (
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
