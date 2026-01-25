// Children feature types
export interface Child {
  id: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
  birthDate: string;
  avatar: string;
}

export interface Sticker {
  id: string;
  name: string;
  emoji: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
