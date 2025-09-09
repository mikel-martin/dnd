import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import type {Party} from '../interfaces/party.interface';
import {HttpClient} from '@angular/common/http';
import {map, type Observable} from 'rxjs';
import {FirebaseUtils} from '../shared/utils/firebase.utils';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  private auth = inject(AuthService);

  private http = inject(HttpClient);

  private baseURL = `${environment.firebase.databaseURL}/${this.auth.user()?.id}/parties`;

  all() {
    return this.http
      .get(`${this.baseURL}.json`)
      .pipe(map(res => FirebaseUtils.parseFirebaseRes(res)));
  }

  find(id: string): Observable<Party> {
    return this.http.get<Party>(`${this.baseURL}/${id}.json`);
  }

  update(party: Party): Observable<Party> {
    return this.http.put<Party>(`${this.baseURL}/${party.id}.json`, party);
  }

  create(party: Party) {
    return this.http.post<Party>(`${this.baseURL}.json`, party).pipe(
      map(res => {
        return {
          id: res.name,
          name: party.name,
        } as Party;
      })
    );
  }

  delete(id: string) {
    const url = `${this.baseURL}/${id}.json`;
    return this.http.delete(url);
  }
}
