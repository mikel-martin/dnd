import {inject, Injectable} from '@angular/core';
import type {Monster} from '../../interfaces/monster.interface';
import {map, of, type Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MonsterMapper} from './monster.mapper';
import type {MonsterDetail} from '../../interfaces/monster-detail.interface';
import {MonsterDetailMapper} from './monster-detail.mapper';
import {ModalService} from '../modal.service';
import {MonsterDetailComponent} from '../../pages/monsters/monster-detail/monster-detail.component';

@Injectable({
  providedIn: 'root',
})
export class MonstersService {
  private baseURL = `${environment.dnd5eURL}/monsters`;

  private http = inject(HttpClient);

  private modal = inject(ModalService);

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

  detail(id: string): Observable<MonsterDetail> {
    return this.http
      .get(`${this.baseURL}/${id}`)
      .pipe(map(MonsterDetailMapper._fromApiToDomain));
  }

  openDetailModal(id: string) {
    this.detail(id).subscribe({
      next: res => {
        this.modal.modal(MonsterDetailComponent, res, {
          with: '600px',
        });
      },
    });
  }
}
