import {Routes} from '@angular/router';
import {PlaylistFormComponent} from './playlist-form/playlist-form.component';
import {MusicComponent} from './music.component';

export const musicRoutes = {
  PLAYLISTS: '',
  PLAYLIST_CREATE: 'create',
  PLAYLIST_DETAIL: ':id',
};

export const routes: Routes = [
  {
    path: musicRoutes.PLAYLISTS,
    component: MusicComponent,
  },
  {
    path: musicRoutes.PLAYLIST_CREATE,
    component: PlaylistFormComponent,
  },
  {
    path: musicRoutes.PLAYLIST_DETAIL,
    component: PlaylistFormComponent,
  },
];
