import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';

// Local components
import { DoctorCard } from '../components/DoctorCard';
import { ConsultationNav } from '../components/ConsultationNav';

// Constants
import { doctors, Doctor } from '../constants/doctors';

interface DoctorListScreenProps {
  navigateTo: (screen: string, data?: any) => void;
  isParentMode: boolean;
  setIsParentMode?: (mode: boolean) => void;
}

export default function DoctorListScreen({
  navigateTo,
  isParentMode,
}: DoctorListScreenProps) {
  const handleDoctorSelect = (doctor: Doctor) => {
    if (doctor.availability !== 'Online') {
      return;
    }
    navigateTo('doctor-detail', doctor);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-6 pt-14 pb-8">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={() => navigateTo('consultation')}
            className="p-2 rounded-xl bg-white/20"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-white font-heading font-bold text-xl">Pilih Dokter</h1>
          <div className="w-10" />
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-heading font-semibold text-base">
                Konsultasi Terpercaya
              </h3>
              <p className="text-blue-100 text-sm font-body">
                Dokter bersertifikat untuk perkembangan anak
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 -mt-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <h3 className="text-gray-900 font-heading font-bold text-lg mb-4">
            Pilih Dokter yang Tepat
          </h3>

          {/* Filter Buttons */}
          <div className="flex space-x-2 mb-4">
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-body font-medium">
              Semua Dokter
            </button>
            <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-body font-medium">
              Anak
            </button>
            <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-body font-medium">
              Umum
            </button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="font-body">Semua dokter telah terverifikasi</span>
          </div>
        </motion.div>
      </div>

      {/* Doctor List */}
      <div className="px-6 pb-24 space-y-4">
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            index={index}
            onSelect={handleDoctorSelect}
          />
        ))}
      </div>

      <ConsultationNav
        navigateTo={navigateTo}
        activeColor={isParentMode ? 'text-orange-500' : 'text-blue-500'}
        isParentMode={isParentMode}
      />
    </div>
  );
}
