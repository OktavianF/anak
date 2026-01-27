import React from 'react';
import { motion } from 'motion/react';

interface GenderNameInputProps {
  childGender: string;
  childName: string;
  onGenderChange: (gender: string) => void;
  onNameChange: (name: string) => void;
}

export const GenderNameInput: React.FC<GenderNameInputProps> = ({
  childGender,
  childName,
  onGenderChange,
  onNameChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Gender Selection */}
      <div className="grid grid-cols-2 gap-4">
        {['male', 'female'].map((gender) => (
          <motion.button
            key={gender}
            onClick={() => onGenderChange(gender)}
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
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Masukkan nama anak..."
          className="w-full p-4 border-2 border-gray-200 rounded-2xl font-body text-lg focus:border-orange-500 focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
};
