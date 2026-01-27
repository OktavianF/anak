import { BookOpen, Trophy, HelpCircle, Star, MessageSquare } from 'lucide-react';

export const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'Pembelajaran':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        icon: BookOpen,
      };
    case 'Pencapaian':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        icon: Trophy,
      };
    case 'Konsultasi':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        icon: HelpCircle,
      };
    case 'Review':
      return {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        icon: Star,
      };
    default:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
        icon: MessageSquare,
      };
  }
};
