import type {EncounterCharacterStatus} from './encounter-character-status.interface';

export interface EncounterCharacter {
  id?: string;
  name: string;
  initiative?: number;
  status?: EncounterCharacterStatus;
}
