import {
  Home,
  MessageSquare,
  Users,
  BarChart3,
  User,
  Brain,
  Theater,
  Target,
} from 'lucide-react';

export const navigationItems = [
  { icon: Home, label: 'Home', screen: 'home' },
  { icon: MessageSquare, label: 'Consultation', screen: 'consultation' },
  { icon: Users, label: 'Community', screen: 'community' },
  { icon: BarChart3, label: 'Progress', screen: 'progress' },
  { icon: User, label: 'Profile', screen: 'profile' },
];

export const testDisplayConfig = [
  {
    id: 'cognitive',
    title: 'Kognitif',
    IconComponent: Brain,
    bgColor: 'bg-blue-50',
    progressColor: 'bg-blue-500',
    testKey: 'cognitive',
  },
  {
    id: 'linguistic',
    title: 'Linguistik',
    IconComponent: MessageSquare,
    bgColor: 'bg-orange-50',
    progressColor: 'bg-orange-500',
    testKey: 'linguistic',
  },
  {
    id: 'personality',
    title: 'Kepribadian',
    IconComponent: Theater,
    bgColor: 'bg-purple-50',
    progressColor: 'bg-purple-500',
    testKey: 'personality',
  },
  {
    id: 'motor',
    title: 'Motorik',
    IconComponent: Target,
    bgColor: 'bg-green-50',
    progressColor: 'bg-green-500',
    testKey: 'motor',
  },
];
