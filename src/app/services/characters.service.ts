import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import type {Character} from '../interfaces/characters.interface';
import {map, Subject, type Observable} from 'rxjs';
import {FirebaseUtils} from '../shared/utils/firebase.utils';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private auth = inject(AuthService);

  private http = inject(HttpClient);

  private baseURL = `${environment.firebase.databaseURL}/${this.auth.user()?.id}/characters`;

  characters = signal<Character[]>([]);

  charactersChanged$ = new Subject<Character[]>();

  all() {
    return this.http.get(`${this.baseURL}.json`).pipe(
      map(res => {
        const response = FirebaseUtils.parseFirebaseRes(res);
        this.characters.set(response);
        return response;
      })
    );
  }

  find(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.baseURL}/${id}.json`);
  }

  update(character: Character): Observable<Character> {
    return this.http
      .put<Character>(`${this.baseURL}/${character.id}.json`, character)
      .pipe(
        map(res => {
          const characters = this.characters().map(c =>
            c.id === character.id ? {...character} : c
          );
          this.characters.set(characters);
          this.charactersChanged$.next(characters);
          return res;
        })
      );
  }

  create(character: Character) {
    return this.http.post(`${this.baseURL}.json`, character);
  }

  delete(id: string) {
    const url = `${this.baseURL}/${id}.json`;
    return this.http.delete(url);
  }

  refreshProjection() {
    this.charactersChanged$.next(this.characters());
  }
}
