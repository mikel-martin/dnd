import { Component, EventEmitter, input, Output, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-input',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FileInputComponent {

  label = input('Select file');

  accept = input('');

  showClearButton = input(true);

  selectedFile: File | null = null;

  @Output("clear") clearEvent =new EventEmitter<void>();
  @Output("change") changeEvent =new EventEmitter<Event>();

  change(event: Event) {
    this.changeEvent.emit(event);
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  clear() {
    this.selectedFile = null;
    this.clearEvent.emit();
  }

}
