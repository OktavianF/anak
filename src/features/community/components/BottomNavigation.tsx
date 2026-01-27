import React from 'react';
import { motion } from 'motion/react';
import { Home, MessageSquare, Users, BarChart3, User } from 'lucide-react';

interface BottomNavigationProps {
  navigateTo: (screen: string) => void;
  activeScreen?: string;
}

export function BottomNavigation({ navigateTo, activeScreen = 'community' }: BottomNavigationProps) {
  const navItems = [
    { icon: Home, label: 'Home', screen: 'home' },
    { icon: MessageSquare, label: 'Konsultasi', screen: 'consultation' },
    { icon: Users, label: 'Komunitas', screen: 'community' },
    { icon: BarChart3, label: 'Progress', screen: 'progress' },
    { icon: User, label: 'Profil', screen: 'profile' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-lg border-t border-slate-200/50 shadow-lg">
      <div className="flex justify-around py-4">
        {navItems.map((item) => {
          const isActive = item.screen === activeScreen;
          return (
            <motion.button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              className={`flex flex-col items-center space-y-1 py-1 px-3 transition-colors ${
                isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
