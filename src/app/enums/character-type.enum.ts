export enum CharacterType {
  PLAYER = 'player',
  ALLY = 'ally',
  ENEMY = 'enemy',
  NEUTRAL = 'neutral',
}

export const CharacterTypes = [
  {
    label: 'Player',
    value: CharacterType.PLAYER,
  },
  {
    label: 'Ally',
    value: CharacterType.ALLY,
  },
  {
    label: 'Enemy',
    value: CharacterType.ENEMY,
  },
  {
    label: 'Neutral',
    value: CharacterType.NEUTRAL,
  },
];
