import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { Character } from '../interfaces/characters.interface';
import { map, type Observable } from 'rxjs';
import { FirebaseUtils } from '../shared/utils/firebase.utils';
import { CombatService } from './combat.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private baseURL: string = "https://no-dungeons-no-dragons-c8f58-default-rtdb.europe-west1.firebasedatabase.app/characters"

  private http = inject(HttpClient);

  private combat = inject(CombatService);

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
    return this.http.put<Character>(`${this.baseURL}/${character.id}.json`, character).pipe(
      map(res => {
        this.combat.updateCharacterInfo([res]);
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

}
