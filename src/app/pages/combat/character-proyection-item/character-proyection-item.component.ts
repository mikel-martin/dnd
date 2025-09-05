import { Component, inject, Input } from '@angular/core';
import type { Character } from '../../../interfaces/characters.interface';
import {
  CharacterType,
  CharacterTypes,
} from '../../../enums/character-type.enum';
import { CharactersService } from '../../../services/characters.service';
import { CommonModule } from '@angular/common';
import { D20Component } from '../../../shared/components/d20/d20.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CharacterStatusBadgeComponent } from '../../../shared/components/character-status-badge/character-status-badge.component';

@Component({
  selector: 'app-character-proyection-item',
  imports: [
    CommonModule,
    D20Component,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    CharacterStatusBadgeComponent
  ],
  templateUrl: './character-proyection-item.component.html',
  styleUrl: './character-proyection-item.component.scss',
})
export class CharacterCombatProyectionItemComponent {
  private characters = inject(CharactersService);

  @Input() character?: Character;

  typeLabel(type: CharacterType = CharacterType.NEUTRAL) {
    return CharacterTypes.find((t) => t.value === type)?.label;
  }

  initiative(initiative: number) {
    if (this.character) {
      this.character.initiative = initiative;
      this.characters.update(this.character).subscribe({
        next: (res) => {
          this.character = res;
        },
      });
    }
  }

  characterHealthStatus(hp: number, max: number) {
    if (hp >= max) return 'Healthy';
    if (hp <= 0) return 'Defeated';
    const hpPercentage = (hp / max) * 100;
    if (hpPercentage >= 50) return 'Injured';
    return 'Bloodied';
  }
}
