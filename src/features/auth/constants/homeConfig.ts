import {
  Home,
  MessageSquare,
  Users,
  BarChart3,
  User,
  Brain,
  Eye,
  Zap,
  Database,
} from 'lucide-react';

export const navigationItems = [
  { icon: Home, label: 'Home', screen: 'home' },
  { icon: MessageSquare, label: 'Consultation', screen: 'consultation' },
  { icon: Users, label: 'Community', screen: 'community' },
  { icon: BarChart3, label: 'Progress', screen: 'progress' },
  { icon: User, label: 'Profile', screen: 'profile' },
];

// CHC-based test display configuration
export const testDisplayConfig = [
  {
    id: 'fluidReasoning',
    title: 'Penalaran Fluida (Gf)',
    IconComponent: Brain,
    bgColor: 'bg-blue-50',
    progressColor: 'bg-blue-500',
    testKey: 'fluidReasoning',
  },
  {
    id: 'comprehensionKnowledge',
    title: 'Pemahaman & Pengetahuan (Gc)',
    IconComponent: MessageSquare,
    bgColor: 'bg-purple-50',
    progressColor: 'bg-purple-500',
    testKey: 'comprehensionKnowledge',
  },
  {
    id: 'visualProcessing',
    title: 'Pemrosesan Visual (Gv)',
    IconComponent: Eye,
    bgColor: 'bg-cyan-50',
    progressColor: 'bg-cyan-500',
    testKey: 'visualProcessing',
  },
  {
    id: 'workingMemory',
    title: 'Memori Kerja (Gsm)',
    IconComponent: Database,
    bgColor: 'bg-emerald-50',
    progressColor: 'bg-emerald-500',
    testKey: 'workingMemory',
  },
  {
    id: 'processingSpeed',
    title: 'Kecepatan Pemrosesan (Gs)',
    IconComponent: Zap,
    bgColor: 'bg-yellow-50',
    progressColor: 'bg-yellow-500',
    testKey: 'processingSpeed',
  },
];
