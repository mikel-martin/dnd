import { Component, inject, Input, input } from '@angular/core';
import type { Character } from '../../../interfaces/characters.interface';
import { CharacterType, CharacterTypes } from '../../../enums/character-type.enum';
import type { CharacterStatus } from '../../../interfaces/character-status.interface';
import { CharactersService } from '../../../services/characters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-combat-proyection-item',
  imports: [CommonModule],
  templateUrl: './character-combat-proyection-item.component.html',
  styleUrl: './character-combat-proyection-item.component.scss'
})
export class CharacterCombatProyectionItemComponent {

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

  characterHealthStatus(hp: number, max: number) {
    if (hp >= max) return "Healthy";
    if (hp <= 0) return "Defeated";
    const hpPercentage = (hp / max) * 100;
    if (hpPercentage >= 50) return "Injured";
    return "Bloodied";
  }

}
