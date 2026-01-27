import React from 'react';
import { motion } from 'motion/react';

interface AgeSelectionProps {
  selectedAge: number;
  onAgeChange: (age: number) => void;
}

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

export const AgeSelection: React.FC<AgeSelectionProps> = ({ selectedAge, onAgeChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {ageOptions.map((age, ageIndex) => (
        <motion.button
          key={`age-${age.label}-${ageIndex}`}
          onClick={() => onAgeChange(age.value)}
          className={`p-4 rounded-2xl border-2 transition-all text-center ${
            selectedAge === age.value
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
};
