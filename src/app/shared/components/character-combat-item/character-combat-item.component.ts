import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { D20Component } from '../d20/d20.component';
import {
  CharacterType,
  CharacterTypes,
} from '../../../enums/character-type.enum';
import type { Character } from '../../../interfaces/characters.interface';
import { CharactersService } from '../../../services/characters.service';
import { CharacterStatusBadgeComponent } from '../character-status-badge/character-status-badge.component';
import type { CharacterStatus } from '../../../interfaces/character-status.interface';
import { MatMenuModule } from '@angular/material/menu';
import { CharacterStatusService } from '../../../services/character-status.service';
import { CombatService } from '../../../services/combat.service';
import { PromptService } from '../../../services/prompt.service';

@Component({
  selector: 'app-character-combat-item',
  imports: [
    CommonModule,
    CharacterStatusBadgeComponent,
    D20Component,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './character-combat-item.component.html',
  styleUrl: './character-combat-item.component.scss',
})
export class CharacterCombatItemComponent {
  private characters = inject(CharactersService);

  private combat = inject(CombatService);

  private prompt = inject(PromptService);

  statusService = inject(CharacterStatusService);

  @Input() character?: Character;

  typeLabel(type: CharacterType = CharacterType.NEUTRAL) {
    return CharacterTypes.find((t) => t.value === type)?.label;
  }

  initiative(initiative: number) {
    if (this.character) {
      this.character.initiative = initiative;
      this.characters.update(this.character).subscribe({
        next: (res) => this.character = res
      });
    }
  }
  
  promptHitPoints() {

    this.prompt
      .open({
        title: 'Hit points',
        description: 'Type the amount of hit points to be subtracted (-) or added (+) to the characters current hit points',
        label: 'Amount',
        type: 'number',
      })
      .subscribe((result) => {
        if (result !== null) {
          const amount = parseInt(result);
          if (amount && !isNaN(amount)) {
            this.updateHitPoints(amount);
          }
        }
      });
  }

  updateHitPoints(amount: number) {
    if (this.character) {
      if (!this.character.currentHitPoints) {
        this.character.currentHitPoints = this.character.maxHitPoints || 0;
      }
      this.character.currentHitPoints += amount;
      if (this.character.currentHitPoints < 0) {
        this.character.currentHitPoints = 0;
      }
      this.characters.update(this.character).subscribe({
        next: (res) => this.character = res
      });
    }
  }

  resetHitPoints() {
    if (this.character) {
      this.character.currentHitPoints = this.character.maxHitPoints || 0;
      this.characters.update(this.character).subscribe({
        next: (res) => this.character = res
      });
    }
  }

  status(states: CharacterStatus[]) {
    if (this.character) {
      this.character.states = states;
      this.characters.update(this.character).subscribe({
        next: (res) => {
          this.character = res;
        },
      });
    }
  }

  setStatus(status: CharacterStatus) {
    if (this.character) {
      if (!this.character.states) {
        this.character.states = [];
      }
      this.character.states.push(status);
      this.characters.update(this.character).subscribe({
        next: (res) => {
          this.character = res;
        },
      });
    }
  }

  remove() {
    if (this.character?.id) {
      this.combat.remove(this.character);
    }
  }
}
