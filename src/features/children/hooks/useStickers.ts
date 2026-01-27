import { useState, useCallback } from 'react';
import { achievementsDatabase, type AchievementInfo } from '@/features/children/constants/profileOptions';

const INITIAL_STICKERS: string[] = [
  'memory-master',
  'puzzle-genius',
  'speed-runner',
];

export function useStickers() {
  const [collectedStickers, setCollectedStickers] = useState<string[]>(INITIAL_STICKERS);
  const [notification, setNotification] = useState<(AchievementInfo & { id: string }) | null>(null);

  const addSticker = useCallback((stickerId: string) => {
    setCollectedStickers((prev) => {
      if (prev.includes(stickerId)) {
        return prev;
      }

      // Show notification if achievement exists in database
      const achievementInfo = achievementsDatabase[stickerId];
      if (achievementInfo) {
        setNotification({
          id: stickerId,
          ...achievementInfo,
        });
      }

      return [...prev, stickerId];
    });
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const hasSticker = useCallback(
    (stickerId: string) => {
      return collectedStickers.includes(stickerId);
    },
    [collectedStickers]
  );

  return {
    collectedStickers,
    notification,
    addSticker,
    clearNotification,
    hasSticker,
  };
}
