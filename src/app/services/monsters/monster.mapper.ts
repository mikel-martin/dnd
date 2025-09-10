import type {Monster} from '../../interfaces/monster.interface';

export class MonsterMapper {
  public static _fromApiToDomain(res: any): Monster {
    const monster: Monster = {
      id: res.index,
      name: res.name,
    };
    return monster;
  }
}
