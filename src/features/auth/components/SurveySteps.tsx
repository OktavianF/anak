import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

// Types
export interface SurveyStep {
  id: string;
  title: string;
  type: 'gender-name' | 'age-selection' | 'multiple-choice';
  options?: string[];
}

interface GenderNameSelectionProps {
  childName: string;
  setChildName: (name: string) => void;
  childGender: string;
  setChildGender: (gender: string) => void;
}

interface AgeSelectionProps {
  childAge: number;
  setChildAge: (age: number) => void;
}

interface MultipleChoiceProps {
  stepId: string;
  options: string[];
  selectedAnswers: string[];
  onToggleAnswer: (stepId: string, option: string) => void;
}

// Gender and Name Selection Component
export function GenderNameSelection({
  childName,
  setChildName,
  childGender,
  setChildGender,
}: GenderNameSelectionProps) {
  return (
    <div className="space-y-6">
      {/* Gender Selection */}
      <div className="grid grid-cols-2 gap-4">
        {['male', 'female'].map((gender) => (
          <motion.button
            key={gender}
            onClick={() => setChildGender(gender)}
            className={`p-6 rounded-3xl border-3 transition-all ${
              childGender === gender
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">{gender === 'male' ? '👦' : '👧'}</div>
              <div className="text-gray-900 font-body font-semibold">
                {gender === 'male' ? 'Laki-laki' : 'Perempuan'}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Name Input */}
      <div>
        <label className="block text-gray-700 font-body font-medium mb-3">Nama Anak</label>
        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder="Masukkan nama anak..."
          className="w-full p-4 border-2 border-gray-200 rounded-2xl font-body text-lg focus:border-orange-500 focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
}

// Age Selection Component
export function AgeSelection({ childAge, setChildAge }: AgeSelectionProps) {
  const ageOptions = [
    { label: '3-4 Tahun', value: 3 },
    { label: '4-5 Tahun', value: 4 },
    { label: '5-6 Tahun', value: 5 },
    { label: '6-7 Tahun', value: 6 },
    { label: '7-8 Tahun', value: 7 },
    { label: '8-9 Tahun', value: 8 },
    { label: '9-10 Tahun', value: 9 },
    { label: '11-12 Tahun', value: 11 },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {ageOptions.map((age, ageIndex) => (
        <motion.button
          key={`age-${age.label}-${ageIndex}`}
          onClick={() => setChildAge(age.value)}
          className={`p-4 rounded-2xl border-2 transition-all text-center ${
            childAge === age.value
              ? 'border-orange-500 bg-orange-50 text-orange-700'
              : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-body font-medium">{age.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

// Multiple Choice Component
export function MultipleChoice({
  stepId,
  options,
  selectedAnswers,
  onToggleAnswer,
}: MultipleChoiceProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isSelected = selectedAnswers.includes(option);
        const uniqueKey = `${stepId}-option-${index}-${option.replace(/\s+/g, '-').toLowerCase()}`;

        return (
          <motion.button
            key={uniqueKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onToggleAnswer(stepId, option)}
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
}

// Survey Progress Bar Component
export function SurveyProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-2 bg-orange-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
