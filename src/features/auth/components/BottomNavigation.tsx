import React from 'react';
import { motion } from 'motion/react';
import { Home, MessageSquare, Users, BarChart3, User, LucideIcon } from 'lucide-react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  screen: string;
}

interface BottomNavigationProps {
  navigateTo: (screen: string) => void;
  activeScreen: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', screen: 'home' },
  { icon: MessageSquare, label: 'Consultation', screen: 'consultation' },
  { icon: Users, label: 'Community', screen: 'community' },
  { icon: BarChart3, label: 'Progress', screen: 'progress' },
  { icon: User, label: 'Profile', screen: 'profile' },
];

export default function BottomNavigation({ navigateTo, activeScreen }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100">
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const isActive = item.screen === activeScreen;
          return (
            <motion.button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              className={`flex flex-col items-center space-y-1 py-2 px-2 ${
                isActive ? 'text-purple-500' : 'text-gray-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon size={18} />
              <span className="text-xs font-body font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
