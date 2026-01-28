// Avatar customization options
export const avatarOptions = ['👦', '👧', '🧒', '👶', '🐱', '🐶', '🦊', '🐼', '🐸', '🦄', '🐵', '🐨'];

// Achievement/Sticker info type
export type AchievementInfo = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earned?: boolean;
};

// Achievements/Badges with rarity levels
export const achievements: AchievementInfo[] = [
  {
    id: 'memory-master',
    name: 'Memory Master',
    emoji: '🧠',
    rarity: 'legendary',
    earned: true,
    description: 'Ahli Memori Super!',
  },
  {
    id: 'puzzle-genius',
    name: 'Puzzle Genius',
    emoji: '🧩',
    rarity: 'epic',
    earned: true,
    description: 'Penyelesai Puzzle Handal!',
  },
  {
    id: 'speed-runner',
    name: 'Speed Runner',
    emoji: '⚡',
    rarity: 'rare',
    earned: true,
    description: 'Pelari Cepat!',
  },
  {
    id: 'pattern-expert',
    name: 'Pattern Expert',
    emoji: '🎯',
    rarity: 'epic',
    earned: true,
    description: 'Ahli Pola!',
  },
  {
    id: 'word-wizard',
    name: 'Word Wizard',
    emoji: '📚',
    rarity: 'rare',
    earned: true,
    description: 'Penyihir Kata!',
  },
  {
    id: 'number-ninja',
    name: 'Number Ninja',
    emoji: '🔢',
    rarity: 'rare',
    earned: true,
    description: 'Ninja Angka!',
  },
  {
    id: 'brain-champion',
    name: 'Brain Champion',
    emoji: '👑',
    rarity: 'legendary',
    earned: false,
    description: 'Juara Otak!',
  },
  {
    id: 'super-learner',
    name: 'Super Learner',
    emoji: '🌟',
    rarity: 'epic',
    earned: false,
    description: 'Pelajar Super!',
  },
  {
    id: 'creativity-king',
    name: 'Creativity King',
    emoji: '🎨',
    rarity: 'rare',
    earned: false,
    description: 'Raja Kreativitas!',
  },
];

export const customizationCategories = [
  { id: 'avatar', name: 'Avatar', emoji: '👤' },
];

// Create a lookup object from achievements array for quick access
export const achievementsDatabase: Record<string, Omit<AchievementInfo, 'id' | 'earned'>> = 
  achievements.reduce((acc, achievement) => {
    acc[achievement.id] = {
      name: achievement.name,
      emoji: achievement.emoji,
      description: achievement.description,
      rarity: achievement.rarity,
    };
    return acc;
  }, {} as Record<string, Omit<AchievementInfo, 'id' | 'earned'>>);

export type AchievementId = (typeof achievements)[number]['id'];
