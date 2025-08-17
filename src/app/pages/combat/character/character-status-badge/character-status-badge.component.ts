import { Component, EventEmitter, input, Output } from '@angular/core';
import type { CombatCharacterStatus } from '../../../../interfaces/combat-character-status-interface';

@Component({
  selector: 'app-character-status-badge',
  imports: [],
  templateUrl: './character-status-badge.component.html',
  styleUrl: './character-status-badge.component.scss'
})
export class CharacterStatusBadgeComponent {

  status = input<CombatCharacterStatus>();

  @Output() onRemove = new EventEmitter<void>();

  remove() {
    this.onRemove.emit();
  }

}
