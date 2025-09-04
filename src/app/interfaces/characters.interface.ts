import type { CharacterStatus } from "./character-status.interface";

export interface Character {
  id?: string;
  name: string;
  maxHitPoints?: number;
  currentHitPoints?: number;
  classArmour?: number;
  savingThrow?: number;
  initiative?: number;
  states?: CharacterStatus[];
}
