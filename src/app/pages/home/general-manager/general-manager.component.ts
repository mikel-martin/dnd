import {Component, inject} from '@angular/core';
import {FileInputComponent} from '../../../shared/components/file-input/file-input.component';
import {ProjectionService} from '../../../services/projection.service';
import {ProjectionEventType} from '../../../enums/projection-event-type.interface';
import {EncodingUtils} from '../../../shared/utils/encoding.utils';
import {ImageViewerComponent} from '../../../shared/components/image-viewer/image-viewer.component';
import type {ImageEvent} from '../../../shared/components/image-viewer/image-event.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-general-manager',
  imports: [
    FileInputComponent,
    ImageViewerComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './general-manager.component.html',
  styleUrl: './general-manager.component.scss',
})
export class GeneralManagerComponent {
  private projection = inject(ProjectionService);

  image: string | null = null;

  clearBackgroundImage() {
    this.image = null;
    this.projection.emit({type: ProjectionEventType.IMAGE, data: null});
  }

  async setBackgroundImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const base64 = await EncodingUtils.toBase64(file);

    this.image = base64;

    this.projection.emit({type: ProjectionEventType.IMAGE, data: base64});
  }

  refresh() {
    this.projection.emit({type: ProjectionEventType.IMAGE, data: this.image});
  }

  imageViewChanged(event: ImageEvent) {
    this.projection.emit({
      type: ProjectionEventType.IMAGE_VIEW_CHANGE,
      data: event,
    });
  }
}
