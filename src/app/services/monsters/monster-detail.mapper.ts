import {environment} from '../../../environments/environment';
import type {MonsterDetail} from '../../interfaces/monster-detail.interface';

export class MonsterDetailMapper {
  public static _fromApiToDomain(res: any): MonsterDetail {
    const monster: MonsterDetail = {
      id: res.id,
      name: res.name,
      size: res.size,
      type: res.type,
      alignment: res.alignment,
      hitPoints: res.hit_points,
      hitDice: res.hit_dice,
      hitPointsRoll: res.hit_points_roll,
      armorClass: {
        type: res.armor_class[0].type ?? 10,
        value: res.armor_class[0].value ?? 10,
      },
      speed: {
        walk: res.speed.walk,
        fly: res.speed.walk,
        swim: res.speed.walk,
      },
      strength: res.strength,
      dexterity: res.dexterity,
      constitution: res.constitution,
      intelligence: res.intelligence,
      wisdom: res.wisdom,
      charisma: res.charisma,
      proficiencies: [],
      damageVulnerabilities: [],
      damageResistances: [],
      damageInmmunities: [],
      conditionInmmunities: [],
      challengeRating: res.challenge_rating,
      proficiencyBonus: res.proficiency_bonus,
      experience: res.experiences,
      specialHabilities: res.special_habilities,
      imageURL: `${environment.dnd5eURL.replace('/2014', '')}/images/monsters/${res.index}.png`,
    };
    return monster;
  }
}
