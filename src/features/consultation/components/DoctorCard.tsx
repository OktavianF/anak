import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageCircle, CheckCircle } from 'lucide-react';
import { Doctor } from '../constants/doctors';

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
  onSelect: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, index, onSelect }: DoctorCardProps) {
  const isAvailable = doctor.availability === 'Online';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 ${
        isAvailable ? 'hover:shadow-md' : 'opacity-75'
      }`}
    >
      <div className="flex items-start space-x-4">
        {/* Doctor Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-blue-100">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          {doctor.verified && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              isAvailable ? 'bg-green-500' : 'bg-yellow-500'
            }`}
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-gray-900 font-heading font-bold text-base leading-tight">
                {doctor.name}
              </h3>
              <p className="text-blue-600 font-body text-sm font-medium">{doctor.specialty}</p>
            </div>
            <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs font-body font-semibold text-gray-700">{doctor.rating}</span>
            </div>
          </div>

          <p className="text-gray-500 font-body text-xs mb-2">{doctor.education}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-xs font-body text-gray-500">{doctor.experience}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div
                  className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-yellow-500'}`}
                />
                <span className="text-xs font-body text-gray-500">
                  {isAvailable ? 'Tersedia' : 'Sibuk'}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-orange-500 font-heading font-bold text-sm">
                Rp {doctor.price.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 font-body">per sesi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="mt-4 flex justify-end">
        <motion.button
          onClick={() => onSelect(doctor)}
          className={`px-6 py-2 rounded-xl font-body font-semibold text-sm flex items-center space-x-2 ${
            isAvailable
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isAvailable}
          whileHover={isAvailable ? { scale: 1.02 } : {}}
          whileTap={isAvailable ? { scale: 0.98 } : {}}
        >
          <MessageCircle size={14} />
          <span>{isAvailable ? 'Mulai Chat' : 'Sedang Sibuk'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
