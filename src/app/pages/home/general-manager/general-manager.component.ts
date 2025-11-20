import {Component, inject, OnInit} from '@angular/core';
import {FileInputComponent} from '../../../shared/components/file-input/file-input.component';
import {ProjectionService} from '../../../services/projection.service';
import {ProjectionEventType} from '../../../enums/projection-event-type.interface';
import {EncodingUtils} from '../../../shared/utils/encoding.utils';
import {ImageViewerComponent} from '../../../shared/components/image-viewer/image-viewer.component';
import type {ImageEvent} from '../../../shared/components/image-viewer/image-event.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MusicService} from '../../../services/music.service';
import type {Playlist} from '../../../interfaces/playlist.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {
  PINNED_PLAYLIST_KEY,
  PlaylistItemComponent,
} from '../../music/playlist-item/playlist-item.component';

@Component({
  selector: 'app-general-manager',
  imports: [
    FileInputComponent,
    ImageViewerComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    PlaylistItemComponent,
  ],
  templateUrl: './general-manager.component.html',
  styleUrl: './general-manager.component.scss',
})
export class GeneralManagerComponent implements OnInit {
  private _projection = inject(ProjectionService);

  private _music = inject(MusicService);

  playlist?: Playlist;

  image: string | null = null;

  ngOnInit() {
    const id = localStorage.getItem(PINNED_PLAYLIST_KEY);
    if (id) {
      this._music.find(id).subscribe(playlist => (this.playlist = playlist));
    }
  }

  clearBackgroundImage() {
    this.image = null;
    this._projection.emit({type: ProjectionEventType.IMAGE, data: null});
  }

  async setBackgroundImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const base64 = await EncodingUtils.toBase64(file);

    this.image = base64;

    this._projection.emit({type: ProjectionEventType.IMAGE, data: base64});
  }

  refresh() {
    this._projection.emit({type: ProjectionEventType.IMAGE, data: this.image});
  }

  imageViewChanged(event: ImageEvent) {
    this._projection.emit({
      type: ProjectionEventType.IMAGE_VIEW_CHANGE,
      data: event,
    });
  }
}
