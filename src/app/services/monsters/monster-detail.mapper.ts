import {environment} from '../../../environments/environment';
import type {MonsterDetail} from '../../interfaces/monster-detail.interface';

export class MonsterDetailMapper {
  public static _fromApiToDomain(res: any): MonsterDetail {
    const monster: MonsterDetail = {
      id: res.index,
      name: res.name,
      size: res.size,
      type: res.type,
      alignment: res.alignment,
      armorClass: {
        type: res.armor_class[0].type ?? 10,
        value: res.armor_class[0].value ?? 10,
      },
      hitPoints: res.hit_points,
      hitPointsRoll: res.hit_points_roll,
      hitDice: res.hit_dice,
      strength: res.strength,
      dexterity: res.dexterity,
      constitution: res.constitution,
      intelligence: res.intelligence,
      wisdom: res.wisdom,
      charisma: res.charisma,
      proficiencyBonus: res.proficiency_bonus,
      savingThrows: res.proficiencies
        .filter((p: any) => p.proficiency.index.startsWith('saving-throw'))
        .map((p: any) => ({
          name: p.proficiency.name.replace('Saving Throw: ', ''),
          value: p.value,
        })),
      abilities: res.proficiencies
        .filter((p: any) => p.proficiency.index.startsWith('skill'))
        .map((p: any) => ({
          name: p.proficiency.name.replace('Skill: ', ''),
          value: p.value,
        })),
      speed: {
        walk: (res.speed.walk ?? '').trim(),
        fly: (res.speed.fly ?? '').trim(),
        swim: (res.speed.swim ?? '').trim(),
      },
      senses:
        res.senses && typeof res.senses === 'object'
          ? Object.entries(res.senses).map(([key, val]) => ({
              name: key.replace(/_/g, ' ').trim(),
              value: String(val),
            }))
          : [],
      languages: res.languages,
      challengeRating: res.challenge_rating,
      experience: res.xp,
      actions: res.actions.map((action: any) => ({
        name: action.name,
        desc: action.desc,
        damage: {
          type: action.damage_type?.name,
          dice: action.damage_dice,
        },
      })),
      legendaryActions: res.legendary_actions,
      specialAbilities: res.special_abilities,
      damageImmunities: res.damage_immunities || [],
      damageResistances: [],
      damageVulnerabilities: [],
      conditionInmmunities: [],
      damageInmmunities: [],
      proficiencies: [],
      imageURL: `${environment.dnd5eURL.replace('/2014', '')}/images/monsters/${res.index}.png`,
    };
    return monster;
  }
}
