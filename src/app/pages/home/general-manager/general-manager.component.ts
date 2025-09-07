import {Component, inject} from '@angular/core';
import {FileInputComponent} from '../../../shared/components/file-input/file-input.component';
import {ProyectionService} from '../../../services/proyection.service';
import {ProyectionEventType} from '../../../enums/proyection-event-type.interface';
import {EncodingUtils} from '../../../shared/utils/encoding.utils';

@Component({
  selector: 'app-general-manager',
  imports: [FileInputComponent],
  templateUrl: './general-manager.component.html',
  styleUrl: './general-manager.component.scss',
})
export class GeneralManagerComponent {
  private proyection = inject(ProyectionService);

  clearBackgroundImage() {
    this.proyection.emit({type: ProyectionEventType.IMAGE, data: null});
  }

  async setBackgroundImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const base64 = await EncodingUtils.toBase64(file);

    this.proyection.emit({type: ProyectionEventType.IMAGE, data: base64});
  }
}
