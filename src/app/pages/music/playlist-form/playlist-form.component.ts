import {Component, inject, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import type {Playlist, Track} from '../../../interfaces/playlist.interface';
import {appRoutes} from '../../../app.routes';
import {Router, ActivatedRoute} from '@angular/router';
import {ModalService} from '../../../services/modal.service';
import {MusicService} from '../../../services/music.service';

@Component({
  selector: 'app-playlist-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './playlist-form.component.html',
  styleUrl: './playlist-form.component.scss',
})
export class PlaylistFormComponent implements OnInit {
  private _music = inject(MusicService);

  private _router = inject(Router);

  private _route = inject(ActivatedRoute);

  private _modal = inject(ModalService);

  playlist?: Playlist;

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
  });

  track = new FormGroup({
    name: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
  });

  tracks: Track[] = [];

  newNameControl = new FormControl('', [Validators.required]);
  newUrlControl = new FormControl('', [Validators.required]);

  ngOnInit() {
    this._fetch();
  }

  cancel() {
    this._router.navigate([appRoutes.MUSIC]);
  }

  save() {
    const playlist: Playlist = {
      id: this.form.value.id ?? '',
      name: this.form.value.name ?? '',
      tracks: this.tracks ?? [],
    };

    if (playlist.id) {
      this._music.update(playlist).subscribe({
        next: () => {
          this._router.navigate([appRoutes.MUSIC]);
        },
      });
    } else {
      this._music.create(playlist).subscribe({
        next: () => {
          this._router.navigate([appRoutes.MUSIC]);
        },
      });
    }
  }

  remove() {
    if (this.playlist?.id) {
      this._modal
        .confirm({
          title: `Deleting '${this.playlist.name}'`,
          description: 'Are you sure you want to delete this playlist?',
          acceptText: 'Yes',
          cancelText: 'No',
        })
        .subscribe(confirm => {
          if (confirm) {
            this._music.delete(this.playlist?.id ?? '').subscribe({
              next: () => this._router.navigate([appRoutes.MUSIC]),
            });
          }
        });
    }
  }

  addTrack() {
    if (this.track.invalid) return;
    const track: Track = {
      name: this.track?.get('name')?.value || '',
      url: this.track?.get('url')?.value || '',
    };
    this.tracks.push(track);
    this.track.reset();
    this.track.markAsUntouched();
  }

  removeTrack(track: Track) {
    this.tracks = this.tracks.filter(t => t.url !== track.url);
  }

  private _fetch() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._music.find(id).subscribe({
        next: res => {
          this.playlist = res;
          this.playlist.id = id;
          this._updateForm(id);
        },
      });
    }
  }

  private _updateForm(id = '') {
    this.form.patchValue({
      id: id,
      name: this.playlist?.name,
    });
    this.tracks = this.playlist?.tracks || [];
  }
}
