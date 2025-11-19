import {Playlist} from './../../interfaces/playlist.interface';
import {Component, inject, OnInit} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Router} from '@angular/router';
import {appRoutes} from '../../app.routes';
import {PlaylistItemComponent} from './playlist-item/playlist-item.component';
import {MatIconModule} from '@angular/material/icon';
import {musicRoutes} from './music.routes';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-music',
  imports: [PlaylistItemComponent, MatIconModule, MatButtonModule],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss',
})
export class MusicComponent implements OnInit {
  private _music = inject(MusicService);

  private _router = inject(Router);

  playslists: Playlist[] = [];

  loading = false;

  ngOnInit() {
    this._fetch();
  }

  private _fetch() {
    this.loading = true;
    this._music
      .all()
      .subscribe({
        next: res => (this.playslists = res),
      })
      .add(() => (this.loading = false));
  }

  create() {
    this._router.navigate([appRoutes.MUSIC, musicRoutes.PLAYLIST_CREATE]);
  }

  detail(playlist: Playlist) {
    this._router.navigate([appRoutes.MUSIC, playlist.id]);
  }
}
