import React from 'react';
import { motion } from 'motion/react';
import { navigationItems } from '../constants/homeConfig';

interface HomeBottomNavProps {
  navigateTo: (screen: string) => void;
  activeScreen?: string;
}

export const HomeBottomNav: React.FC<HomeBottomNavProps> = ({
  navigateTo,
  activeScreen = 'home',
}) => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100">
      <div className="flex justify-around py-3">
        {navigationItems.map((item) => {
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
};
