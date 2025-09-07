import type {CombatCharacterStatus} from './combat-character-status-interface';

export interface CombatCharacter {
  id?: string;
  name: string;
  initiative?: number;
  status?: CombatCharacterStatus;
}
