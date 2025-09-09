import {inject, Injectable} from '@angular/core';
import type {Spell} from '../interfaces/spell.interface';
import {map, type Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import type {SpellDetail} from '../interfaces/spell-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class SpellsService {
  private baseURL = 'https://www.dnd5eapi.co/api/2014/spells';

  private http = inject(HttpClient);

  all(): Observable<Spell[]> {
    return this.http.get(this.baseURL).pipe(
      map((res: any) => {
        return res.results.map((i: any) => {
          const spell: Spell = {
            id: i.index,
            name: i.name,
            level: i.level,
          };
          return spell;
        });
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
