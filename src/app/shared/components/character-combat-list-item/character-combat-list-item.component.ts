import { CommonModule } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { D20Component } from '../d20/d20.component';
import { CharacterType, CharacterTypes } from '../../../enums/character-type.enum';
import type { Character } from '../../../interfaces/characters.interface';
import { CharactersService } from '../../../services/characters.service';
import { CharacterStatusBadgeComponent } from '../character-status-badge/character-status-badge.component';
import type { CharacterStatus } from '../../../interfaces/character-status.interface';

@Component({
  selector: 'app-character-combat-list-item',
  imports: [
    CommonModule,
    CharacterStatusBadgeComponent,
    D20Component,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './character-combat-list-item.component.html',
  styleUrl: './character-combat-list-item.component.scss'
})
export class CharacterCombatListItemComponent {

  private characters = inject(CharactersService);

  @Input() character?: Character;

  typeLabel(type: CharacterType = CharacterType.NEUTRAL) {
    return CharacterTypes.find(t => t.value === type)?.label;
  }

  initiative(initiative: number) {
    if (this.character) {
      this.character.initiative = initiative;
      this.characters.update(this.character).subscribe({
        next: res => {
          this.character = res;
        }
      });
    }
  }

  status(states: CharacterStatus[]) {
    console.log(states);
  }

}
