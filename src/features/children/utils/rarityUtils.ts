export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return 'from-yellow-400 to-orange-500';
    case 'epic':
      return 'from-purple-400 to-pink-500';
    case 'rare':
      return 'from-blue-400 to-indigo-500';
    default:
      return 'from-gray-400 to-gray-500';
  }
};

export const getRarityGlow = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return 'shadow-yellow-500/50';
    case 'epic':
      return 'shadow-purple-500/50';
    case 'rare':
      return 'shadow-blue-500/50';
    default:
      return 'shadow-gray-500/50';
  }
};
