/**
 * GameStats - Menampilkan statistik game (level, skor, nyawa, timer)
 * 
 * Komponen ini digunakan di header setiap game untuk menampilkan
 * progress dan status permainan saat ini.
 */

import React from 'react';
import { Clock } from 'lucide-react';
import type { GameStatsProps, GameTheme } from './types';
import { LivesIndicator } from './LivesIndicator';
import { TimerDisplay } from './TimerDisplay';

const themeMutedText: Record<GameTheme, string> = {
  purple: 'text-purple-100',
  blue: 'text-blue-100',
  green: 'text-emerald-100',
  orange: 'text-orange-100',
  pink: 'text-pink-100',
};

export function GameStats({
  level,
  maxLevel,
  score,
  lives,
  maxLives,
  timeLeft,
  showTimer = true,
  theme = 'purple',
}: GameStatsProps) {
  const mutedText = themeMutedText[theme];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-4">
      <div className="flex items-center justify-between text-center">
        {/* Level */}
        <div>
          <span className="text-white font-heading font-bold text-lg">
            Level {level}
          </span>
          <p className={`${mutedText} font-body text-xs`}>dari {maxLevel}</p>
        </div>

        {/* Score */}
        <div>
          <span className="text-white font-heading font-bold text-lg">{score}</span>
          <p className={`${mutedText} font-body text-xs`}>Skor</p>
        </div>

        {/* Lives */}
        <div>
          <LivesIndicator current={lives} max={maxLives} />
          <p className={`${mutedText} font-body text-xs mt-1`}>Nyawa</p>
        </div>

        {/* Timer */}
        {showTimer && timeLeft !== undefined && (
          <div>
            <TimerDisplay timeLeft={timeLeft} theme={theme} />
            <p className={`${mutedText} font-body text-xs`}>Detik</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameStats;
