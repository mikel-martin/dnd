import { Component, EventEmitter, input, Output } from '@angular/core';
import type { CharacterStatus } from '../../../interfaces/character-status.interface';

@Component({
  selector: 'app-character-status-badge',
  imports: [],
  templateUrl: './character-status-badge.component.html',
  styleUrl: './character-status-badge.component.scss'
})
export class CharacterStatusBadgeComponent {

  states = input<CharacterStatus[]>([]);

  @Output("change") changeEvent = new EventEmitter<CharacterStatus[]>();

  remove(index: number) {
    if (this.states) {
      this.states().splice(index, 1);
      this.changeEvent.emit(this.states());
    }
  }

}
