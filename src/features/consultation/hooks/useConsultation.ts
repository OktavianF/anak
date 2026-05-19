import { useCallback, useMemo } from 'react';
import { LucideIcon, BookOpen, Stethoscope, Users, Heart } from 'lucide-react';

interface ConsultationOption {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  textColor: string;
  features: string[];
  action: () => void;
}

interface UseConsultationOptions {
  navigateTo: (screen: string, data?: unknown) => void;
}

export function useConsultation({ navigateTo }: UseConsultationOptions) {
  const handleNavigate = useCallback(
    (screen: string, data?: unknown) => {
      navigateTo(screen, data);
    },
    [navigateTo]
  );

  const consultationOptions = useMemo<ConsultationOption[]>(
    () => [
      {
        id: 'parent-guide',
        title: 'Panduan Orang Tua',
        description: 'Tips dan panduan lengkap untuk mendampingi perkembangan anak',
        icon: BookOpen,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        features: [
          'Panduan perkembangan anak',
          'Tips parenting',
          'Aktivitas edukatif',
          'Milestone tracking',
        ],
        action: () => handleNavigate('parent-guide'),
      },
      {
        id: 'doctor-consultation',
        title: 'Konsultasi Dokter',
        description: 'Konsultasi langsung dengan dokter anak dan psikolog berpengalaman',
        icon: Stethoscope,
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
        features: ['Chat real-time', 'Video call', 'Rekam medis', 'Resep digital'],
        action: () => handleNavigate('doctor-list'),
      },
      {
        id: 'community',
        title: 'Komunitas Orang Tua',
        description: 'Bergabung dengan komunitas orang tua untuk berbagi pengalaman',
        icon: Users,
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600',
        features: ['Forum diskusi', 'Grup parenting', 'Tips dari ahli', 'Event online'],
        action: () => handleNavigate('community'),
      },
      {
        id: 'mental-health',
        title: 'Kesehatan Mental',
        description: 'Dukungan untuk kesehatan mental anak dan keluarga',
        icon: Heart,
        color: 'from-rose-500 to-rose-600',
        bgColor: 'bg-rose-50',
        textColor: 'text-rose-600',
        features: ['Screening emosi', 'Tips relaksasi', 'Cerita interaktif', 'Meditasi anak'],
        action: () => handleNavigate('mental-health'),
      },
    ],
    [handleNavigate]
  );

  return {
    consultationOptions,
    handleNavigate,
  };
}

export default useConsultation;
export type { ConsultationOption };
