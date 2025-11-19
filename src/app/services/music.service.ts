import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {map, type Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import type {Playlist} from '../interfaces/playlist.interface';
import {FirebaseUtils} from '../shared/utils/firebase.utils';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private auth = inject(AuthService);

  private http = inject(HttpClient);

  private baseURL = `${environment.firebase.databaseURL}/${this.auth.user()?.id}/playlists`;

  playlists = signal<Playlist[]>([]);

  all() {
    return this.http
      .get(`${this.baseURL}.json`)
      .pipe(map(res => FirebaseUtils.parseFirebaseRes(res)));
  }

  find(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.baseURL}/${id}.json`);
  }

  update(playlist: Playlist): Observable<Playlist> {
    return this.http.put<Playlist>(
      `${this.baseURL}/${playlist.id}.json`,
      playlist
    );
  }

  create(character: Playlist) {
    return this.http.post(`${this.baseURL}.json`, character);
  }

  delete(id: string) {
    const url = `${this.baseURL}/${id}.json`;
    return this.http.delete(url);
  }
}
