import { Sparkles, Clock, HelpCircle, Award } from 'lucide-react';

export const topics = [
  {
    id: 'popular',
    label: 'Populer',
    icon: Sparkles,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    id: 'recent',
    label: 'Terbaru',
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 'question',
    label: 'Q&A',
    icon: HelpCircle,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'achievement',
    label: 'Pencapaian',
    icon: Award,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
];
