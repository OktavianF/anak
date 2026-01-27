import { BookOpen, Stethoscope } from 'lucide-react';

export interface ConsultationOption {
  id: string;
  title: string;
  description: string;
  icon: typeof BookOpen;
  color: string;
  bgColor: string;
  textColor: string;
  features: string[];
}

export const consultationOptions: ConsultationOption[] = [
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
  },
  {
    id: 'doctor-consultation',
    title: 'Konsultasi Dokter',
    description: 'Konsultasi langsung dengan dokter anak dan psikolog berpengalaman',
    icon: Stethoscope,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    features: [
      'Konsultasi real-time',
      'Dokter bersertifikat',
      'Sesi privat & aman',
      'Rekam medis digital',
    ],
  },
];
