import React from 'react';
import { Activity } from 'lucide-react';

interface ProgressHeaderProps {
  childName: string;
}

export default function ProgressHeader({ childName }: ProgressHeaderProps) {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-slate-800 font-heading text-xl">Dashboard Perkembangan</h1>
        </div>
        <p className="text-slate-500 text-sm">Pantau progress belajar {childName}</p>
      </div>
    </div>
  );
}
