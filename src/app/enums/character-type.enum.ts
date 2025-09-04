export enum CharacterType {
  PLAYER = 'player',
  ALLY = 'ally',
  ENEMY = 'enemy',
  NEUTRAL = 'neutral'
}

export const CharacterTypes: CharacterType[] = Object.values(CharacterType);
