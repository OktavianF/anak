import { useState, useCallback } from 'react';
import { stickerDatabase, StickerId, StickerInfo } from '../constants/stickerDatabase';

const INITIAL_STICKERS: string[] = [
  'cognitive-test-complete',
  'memory-master',
  'panda-buddy',
  'level-up',
];

export function useStickers() {
  const [collectedStickers, setCollectedStickers] = useState<string[]>(INITIAL_STICKERS);
  const [notification, setNotification] = useState<StickerInfo | null>(null);

  const addSticker = useCallback((stickerId: string) => {
    setCollectedStickers((prev) => {
      if (prev.includes(stickerId)) {
        return prev;
      }

      // Show notification if sticker exists in database
      const stickerInfo = stickerDatabase[stickerId as StickerId];
      if (stickerInfo) {
        setNotification({
          id: stickerId,
          ...stickerInfo,
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
