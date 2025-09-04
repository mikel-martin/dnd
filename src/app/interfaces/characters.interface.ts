import type { CharacterType } from "../enums/character-type.enum";
import type { CharacterStatus } from "./character-status.interface";

export interface Character {
  id?: string;
  name: string;
  type: CharacterType;
  maxHitPoints?: number;
  currentHitPoints?: number;
  passivePerception?: number;
  classArmour?: number;
  savingThrow?: number;
  initiative?: number;
  states?: CharacterStatus[];
}
