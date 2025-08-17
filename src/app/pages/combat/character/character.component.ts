import { Component, inject, input } from '@angular/core';
import { CombatCharacter } from '../../../interfaces/combat-character.interface';
import { D20Component } from '../../../shared/components/d20/d20.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CombatService } from '../../../services/combat.service';
import { CommonModule } from '@angular/common';
import { CharacterStatusBadgeComponent } from './character-status-badge/character-status-badge.component';
import { CharacterStatusService } from '../../../services/character-status.service';

@Component({
  selector: 'app-character',
  imports: [
    CommonModule,
    D20Component,
    CharacterStatusBadgeComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {

  index = input<number>(-1);

  character = input<CombatCharacter>();

  combatService = inject(CombatService);

  characterStatusService = inject(CharacterStatusService);

  setStatus(statusId: string) {
    const characterId = this.character()?.id;
    const status = this.characterStatusService.find(statusId);
    if (status && characterId) {
      this.combatService.setStatus(status.id, characterId);
    }
  }

  removeStatus() {
    this.combatService.removeStatus(this.character()?.id || "");
  }

  remove() {
    const character = this.character();
    if (character != undefined) {
      this.combatService.remove(character);
    }
  }

}
