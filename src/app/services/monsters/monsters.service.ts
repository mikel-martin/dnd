import {inject, Injectable} from '@angular/core';
import type {Monster} from '../../interfaces/monster.interface';
import {map, of, type Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MonsterMapper} from './monster.mapper';
import type {MonsterDetail} from '../../interfaces/monster-detail.interface';
import {MonsterDetailMapper} from './monster-detail.mapper';

@Injectable({
  providedIn: 'root',
})
export class MonstersService {
  private baseURL = `${environment.dnd5eURL}/monsters`;

  private http = inject(HttpClient);

  private monsters: Monster[] = [];

  all(): Observable<Monster[]> {
    if (this.monsters && this.monsters.length > 0) {
      return of(this.monsters);
    }
    return this.http.get(this.baseURL).pipe(
      map((res: any) => {
        const monsters = res.results.map(MonsterMapper._fromApiToDomain);
        this.monsters = monsters;
        return monsters;
      })
    );
  }

  search(search: string): Observable<Monster[]> {
    return this.http
      .get(`${this.baseURL}?name=${search}`)
      .pipe(map((res: any) => res.results.map(MonsterMapper._fromApiToDomain)));
  }

  detail(spell: Monster): Observable<MonsterDetail> {
    return this.http
      .get(`${this.baseURL}/${spell.id}`)
      .pipe(map(MonsterDetailMapper._fromApiToDomain));
  }
}
