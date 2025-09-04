import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { Character } from '../interfaces/characters.interface';
import { map, type Observable } from 'rxjs';
import { FirebaseUtils } from '../shared/utils/firebase.utils';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private baseURL: string = "https://no-dungeons-no-dragons-c8f58-default-rtdb.europe-west1.firebasedatabase.app/characters"

  private http = inject(HttpClient);

  characters = signal<Character[]>([]);

  constructor() { }

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
    return this.http.put<Character>(`${this.baseURL}/${character.id}.json`, character);
  }

  create(event: Character) {
    return this.http.post(`${this.baseURL}.json`, event);
  }

  delete(id: string) {
    const url = `${this.baseURL}/${id}.json`;
    return this.http.delete(url);
  }

}
