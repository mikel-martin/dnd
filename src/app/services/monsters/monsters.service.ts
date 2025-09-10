import {inject, Injectable} from '@angular/core';
import type {Monster} from '../../interfaces/monster.interface';
import {map, type Observable} from 'rxjs';
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

  all(): Observable<Monster[]> {
    return this.http
      .get(this.baseURL)
      .pipe(map((res: any) => res.results.map(MonsterMapper._fromApiToDomain)));
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
