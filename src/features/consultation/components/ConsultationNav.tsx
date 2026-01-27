import React from 'react';
import { motion } from 'motion/react';
import { Home, MessageSquare, Users, BarChart3, User } from 'lucide-react';

interface ConsultationNavProps {
  navigateTo: (screen: string) => void;
  activeColor?: string;
  isParentMode?: boolean;
}

export function ConsultationNav({
  navigateTo,
  activeColor = 'text-purple-500',
  isParentMode,
}: ConsultationNavProps) {
  const navItems = [
    { icon: Home, label: 'Home', screen: 'home' },
    { icon: MessageSquare, label: 'Consultation', screen: 'consultation', active: true },
    { icon: Users, label: 'Community', screen: 'community' },
    { icon: BarChart3, label: 'Progress', screen: 'progress' },
    { icon: User, label: 'Profile', screen: 'profile' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100">
      <div className="flex justify-around py-3">
        {navItems.map((item) => (
          <motion.button
            key={item.screen}
            onClick={() => navigateTo(item.screen)}
            className={`flex flex-col items-center space-y-1 py-2 px-3 ${
              item.active ? activeColor : 'text-gray-400'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon size={16} />
            <span className="text-xs font-body font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
