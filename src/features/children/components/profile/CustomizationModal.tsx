import React from 'react';
import { motion } from 'motion/react';
import { Coins } from 'lucide-react';
import { avatarOptions } from '../../constants/stickerDatabase';

interface CustomizationModalProps {
  isOpen: boolean;
  currentCoins: number;
  onPurchase: (item: { avatar: string }, cost: number) => void;
  onClose: () => void;
}

export function CustomizationModal({
  isOpen,
  currentCoins,
  onPurchase,
  onClose,
}: CustomizationModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="text-center mb-6">
          <h3 className="text-slate-800 font-heading text-2xl mb-2">👤 Pilih Avatar 👤</h3>
          <div className="flex items-center justify-center space-x-2">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="text-slate-600 font-bold">{currentCoins.toLocaleString()}</span>
          </div>
        </div>

        {/* Avatar Items */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {avatarOptions.map((item, index) => (
            <button
              key={index}
              onClick={() => onPurchase({ avatar: item }, 100)}
              className="relative aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl hover:scale-105 transition-transform border-2 border-transparent hover:border-purple-300"
            >
              {item}
              <div className="absolute bottom-0 right-0 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                100
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-heading font-bold"
        >
          Tutup
        </button>
      </motion.div>
    </motion.div>
  );
}
