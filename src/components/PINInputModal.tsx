import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Lock, AlertCircle } from 'lucide-react';

interface PINInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PINInputModal({ isOpen, onClose, onSuccess }: PINInputModalProps) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const correctPIN = '1234'; // Static PIN for prototype

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.querySelector(
        `input[data-pin-index="${index + 1}"]`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      // Focus previous input on backspace
      const prevInput = document.querySelector(
        `input[data-pin-index="${index - 1}"]`
      ) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredPIN = pin.join('');

    if (enteredPIN.length !== 4) {
      setError('PIN harus terdiri dari 4 digit');
      return;
    }

    setIsLoading(true);

    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (enteredPIN === correctPIN) {
      onSuccess();
      onClose();
      resetForm();
    } else {
      setError('PIN salah, coba lagi');
      setPin(['', '', '', '']);
      // Focus first input
      const firstInput = document.querySelector(`input[data-pin-index="0"]`) as HTMLInputElement;
      if (firstInput) firstInput.focus();
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setPin(['', '', '', '']);
    setError('');
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-80 mx-4 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-gray-900 font-heading text-xl mb-2">Masukkan PIN Orang Tua</h2>
          <p className="text-gray-500 text-sm">Untuk mengakses dashboard orang tua</p>
        </div>

        {/* PIN Input */}
        <div className="flex justify-center space-x-3 mb-6">
          {pin.map((digit, index) => (
            <input
              key={index}
              type="password"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              data-pin-index={index}
              className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-colors ${
                error
                  ? 'border-red-300 bg-red-50 focus:border-red-500'
                  : 'border-gray-200 focus:border-indigo-500 focus:bg-indigo-50'
              }`}
              maxLength={1}
              autoComplete="off"
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 text-red-600 text-sm mb-6"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || pin.join('').length !== 4}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
            isLoading || pin.join('').length !== 4
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-105 active:scale-95'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Memverifikasi...</span>
            </div>
          ) : (
            'Masuk'
          )}
        </button>

        {/* Hint */}
        <p className="text-center text-xs text-gray-400 mt-4">Hint untuk demo: 1234</p>
      </motion.div>
    </div>
  );
}
