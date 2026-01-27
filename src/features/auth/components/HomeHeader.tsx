import React from 'react';
import { motion } from 'motion/react';
import { Search, UserRound } from 'lucide-react';

interface HomeHeaderProps {
  greeting?: string;
  title?: string;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  greeting = 'Selamat Datang',
  title = 'Bunda !',
}) => {
  return (
    <div className="bg-white px-6 pt-14 pb-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-gray-600 font-body text-base">{greeting}</p>
          <h1 className="text-gray-900 font-heading font-bold text-2xl">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2">
            <Search className="w-6 h-6 text-gray-600" />
          </button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-md bg-purple-100">
            <UserRound className="w-7 h-7 text-purple-400" strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </div>
  );
};
