// Sticker Database with all available stickers
export const stickerDatabase = {
  // Achievement Stickers
  'cognitive-test-complete': {
    name: 'Brain Explorer',
    emoji: '🧠',
    description: 'Selesaikan tes kognitif',
    rarity: 'common',
  },
  'logic-master': {
    name: 'Logic Master',
    emoji: '💡',
    description: 'Master tes logika',
    rarity: 'epic',
  },
  'attention-expert': {
    name: 'Attention Expert',
    emoji: '👁️',
    description: 'Expert dalam tes perhatian',
    rarity: 'rare',
  },
  'memory-champion': {
    name: 'Memory Champion',
    emoji: '🧩',
    description: 'Juara tes memori',
    rarity: 'epic',
  },
  'linguistic-test-complete': {
    name: 'Language Star',
    emoji: '🗣️',
    description: 'Selesaikan tes bahasa',
    rarity: 'common',
  },
  'receptive-master': {
    name: 'Receptive Master',
    emoji: '👂',
    description: 'Master bahasa reseptif',
    rarity: 'rare',
  },
  'expressive-star': {
    name: 'Expressive Star',
    emoji: '💬',
    description: 'Bintang bahasa ekspresif',
    rarity: 'rare',
  },
  'phonemic-expert': {
    name: 'Phonemic Expert',
    emoji: '🔤',
    description: 'Expert dalam fonemik',
    rarity: 'epic',
  },
  'animal-mbti-complete': {
    name: 'Personality Explorer',
    emoji: '🦁',
    description: 'Temukan kepribadian hewan',
    rarity: 'legendary',
  },

  // Game Stickers
  'memory-master': {
    name: 'Memory Master',
    emoji: '🧠',
    description: 'Selesaikan memory game!',
    rarity: 'rare',
  },
  'word-master': {
    name: 'Word Master',
    emoji: '📝',
    description: 'Ahli dalam word puzzle!',
    rarity: 'rare',
  },
  'number-master': {
    name: 'Number Master',
    emoji: '🔢',
    description: 'Master urutan angka!',
    rarity: 'epic',
  },
  'number-explorer': {
    name: 'Number Explorer',
    emoji: '🧮',
    description: 'Penjelajah angka!',
    rarity: 'common',
  },
  'pattern-master': {
    name: 'Pattern Master',
    emoji: '🎯',
    description: 'Ahli mengenali pola!',
    rarity: 'legendary',
  },
  'pattern-explorer': {
    name: 'Pattern Explorer',
    emoji: '👁️',
    description: 'Mata tajam!',
    rarity: 'rare',
  },
  'puzzle-master': {
    name: 'Puzzle Master',
    emoji: '🧩',
    description: 'Master puzzle game!',
    rarity: 'epic',
  },
  'artist-star': {
    name: 'Artist Star',
    emoji: '🎨',
    description: 'Selesaikan coloring game!',
    rarity: 'common',
  },
  'motor-master': {
    name: 'Motor Master',
    emoji: '🏃',
    description: 'Master tes motorik!',
    rarity: 'legendary',
  },
  'motor-star': {
    name: 'Motor Star',
    emoji: '⭐',
    description: 'Bintang tes motorik!',
    rarity: 'rare',
  },
  'motor-participant': {
    name: 'Motor Participant',
    emoji: '🏃‍♂️',
    description: 'Ikut serta tes motorik!',
    rarity: 'common',
  },
  'tips-explorer': {
    name: 'Tips Explorer',
    emoji: '💡',
    description: 'Belajar dari tips motorik!',
    rarity: 'common',
  },

  // Character Stickers
  'panda-buddy': {
    name: 'Panda Buddy',
    emoji: '🐼',
    description: 'Teman panda imut',
    rarity: 'common',
  },
  'unicorn-magic': {
    name: 'Unicorn Magic',
    emoji: '🦄',
    description: 'Keajaiban unicorn',
    rarity: 'legendary',
  },
  'cool-penguin': {
    name: 'Cool Penguin',
    emoji: '🐧',
    description: 'Penguin keren',
    rarity: 'rare',
  },
  'tiger-champ': {
    name: 'Tiger Champ',
    emoji: '🐯',
    description: 'Juara harimau',
    rarity: 'epic',
  },
  'happy-frog': {
    name: 'Happy Frog',
    emoji: '🐸',
    description: 'Katak bahagia',
    rarity: 'common',
  },

  // Progress Stickers
  'level-up': {
    name: 'Level Up!',
    emoji: '🎯',
    description: 'Naik level!',
    rarity: 'rare',
  },
  'first-test': {
    name: 'First Test Completed',
    emoji: '🥇',
    description: 'Tes pertama selesai',
    rarity: 'common',
  },
  'five-days-streak': {
    name: '5 Days Streak',
    emoji: '🌟',
    description: 'Belajar 5 hari berturut',
    rarity: 'epic',
  },
  'hot-streak': {
    name: 'Hot Streak!',
    emoji: '🔥',
    description: 'Sedang on fire!',
    rarity: 'legendary',
  },
  'all-tests-done': {
    name: 'All Tests Done!',
    emoji: '🎉',
    description: 'Semua tes selesai!',
    rarity: 'legendary',
  },
} as const;

export type StickerId = keyof typeof stickerDatabase;

export type StickerInfo = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  rarity: string;
};
