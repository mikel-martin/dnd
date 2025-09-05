import {
  CharacterType,
  CharacterTypes,
} from '../../../enums/character-type.enum';
import {
  Component,
  inject,
  Input,
} from '@angular/core';
import type { Character } from '../../../interfaces/characters.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { appRoutes } from '../../../app.routes';
import { CharactersService } from '../../../services/characters.service';
import { CharacterStatusService } from '../../../services/character-status.service';
import { MatMenuModule } from '@angular/material/menu';
import { CombatService } from '../../../services/combat.service';
import type { CharacterStatus } from '../../../interfaces/character-status.interface';
import { D20Component } from '../d20/d20.component';
import { PromptService } from '../../../services/prompt.service';
import { CharacterUtils } from '../../utils/character.utils';
import { CharacterStatusBadgeComponent } from '../character-status-badge/character-status-badge.component';

@Component({
  selector: 'app-character-item',
  imports: [
    CommonModule,
    RouterModule,
    CharacterStatusBadgeComponent,
    D20Component,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './character-item.component.html',
  styleUrl: './character-item.component.scss',
})
export class CharacterItemComponent {
  
  @Input() mode: "encounter" | "proyection" | "edition" = "edition";

  @Input() character?: Character;

  private characters = inject(CharactersService);

  private encounter = inject(CombatService);

  private router = inject(Router);

  private prompt = inject(PromptService);

  statusService = inject(CharacterStatusService);

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

  edit(event: Event) {
    if (this.mode !== "encounter") {
      this.router.navigate([appRoutes.CHARACTERS, this.character?.id]);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  removeFromEncounter() {
    if (this.character?.id) {
      this.encounter.remove(this.character);
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

  addState(status: CharacterStatus) {
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
  
  statesChanged(states: CharacterStatus[]) {
    if (this.character) {
      if (!this.character.states) {
        this.character.states = [];
      }
      this.character.states = states;
      this.characters.update(this.character).subscribe({
        next: (res) => {
          this.character = res;
        },
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
            this._addHitPoints(amount);
          }
        }
      });
  }

  getCharacterHealthStatus() {
    return CharacterUtils.getCharacterHealthStatus(this.character?.currentHitPoints ?? 0, this.character?.maxHitPoints ?? 0)
  }

  private _addHitPoints(amount: number) {
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

}
