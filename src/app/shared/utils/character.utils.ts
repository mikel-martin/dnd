import {HEALTH_STATES} from './../../interfaces/character-health-status.interface';
import {CharacterType, CharacterTypes} from '../../enums/character-type.enum';
import type {CharacterHealthStatus} from '../../interfaces/character-health-status.interface';

export class CharacterUtils {
  static HEALTH_STATES: any;

  public static getTypeLabel(type: CharacterType = CharacterType.NEUTRAL) {
    return CharacterTypes.find(t => t.value === type)?.label;
  }

  public static getCharacterHealthStatus(
    hp: number,
    max: number
  ): CharacterHealthStatus {
    if (hp >= max) return HEALTH_STATES['HEALTHY'];
    if (hp <= 0) return HEALTH_STATES['DEFEATED'];
    const hpPercentage = (hp / max) * 100;
    if (hpPercentage >= 50) return HEALTH_STATES['INJURED'];
    return HEALTH_STATES['BLOODIED'];
  }
}
