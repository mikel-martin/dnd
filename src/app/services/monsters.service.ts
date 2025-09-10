import {inject, Injectable} from '@angular/core';
import type {Monster} from '../interfaces/monster.interface';
import {map, type Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MonstersService {
  private baseURL = `${environment.dnd5eURL}/monsters`;

  private http = inject(HttpClient);

  all(): Observable<Monster[]> {
    return this.http
      .get(this.baseURL)
      .pipe(map((res: any) => res.results.map(this._fromApiToDomain)));
  }

  search(spell: Monster): Observable<Monster> {
    return this.http
      .get(`${this.baseURL}/${spell.id}`)
      .pipe(map(this._fromApiToDomain));
  }

  private _fromApiToDomain(res: any): Monster {
    const monster: Monster = {
      id: res.id,
      name: res.name,
      size: res.size,
      type: res.type,
      aligment: res.aligment,
      hitPoints: res.hitPoints,
      hitDice: res.hitDice,
      hitPointsRoll: res.hitPointsRoll,
      armorClass: {
        type: res.armorClass.type,
        value: res.armorClass.value,
      },
      speed: {
        walk: res.speed.walk,
        fly: res.speed.walk,
        swim: res.speed.walk,
      },
      strength: res.strength,
      dexterity: res.dexteritys,
      constitution: res.constitutions,
      intelligence: res.intelligences,
      wisdom: res.wisdoms,
      charisma: res.charismas,
      proficiencies: [],
      damageVulnerabilities: [],
      damageResistances: [],
      damageInmmunities: [],
      conditionInmmunities: [],
      challengeRating: res.challengeRatings,
      proficiencyBonus: res.proficiencyBonuss,
      experience: res.experiences,
      specialhabilities: res.sspecialhabilities,
      imageURL: res.imageURLs,
    };
    return monster;
  }
}
