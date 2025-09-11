import {inject, Injectable} from '@angular/core';
import type {Spell} from '../interfaces/spell.interface';
import {map, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import type {SpellDetail} from '../interfaces/spell-detail.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpellsService {
  private baseURL = `${environment.dnd5eURL}/spells`;

  private http = inject(HttpClient);

  private spells: Spell[] = [];

  all(): Observable<Spell[]> {
    if (this.spells) {
      return of(this.spells);
    }
    return this.http.get(this.baseURL).pipe(
      map((res: any) => {
        const spells = res.results.map((i: any) => ({
          id: i.index,
          name: i.name,
          level: i.level,
        }));
        this.spells = spells;
        return spells;
      })
    );
  }

  search(spell: Spell): Observable<SpellDetail> {
    return this.http.get(`${this.baseURL}/${spell.id}`).pipe(
      map((res: any) => {
        const spell: SpellDetail = {
          id: res.index,
          name: res.name,
          description: res.desc,
          higherLevel: res.higher_level,
          range: res.range,
          components: res.components,
          ritual: res.ritual,
          duration: res.duration,
          concentration: res.concentration,
          level: res.level,
        };
        return spell;
      })
    );
  }
}
