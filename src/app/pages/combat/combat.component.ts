import { Component, inject } from '@angular/core';
import { CharacterComponent } from './character/character.component';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CombatCharacter } from '../../interfaces/combat-character.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CombatService } from '../../services/combat.service';

@Component({
  selector: 'app-combat',
  imports: [
    CharacterComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.scss'
})
export class CombatComponent {

  private dialog = inject(MatDialog);

  combatService = inject(CombatService);

  add() {
    this.dialog.open(CharacterFormComponent, {
      width: "500px"
    });
  }

  next() {
    this.combatService.next();
  }

  previous() {
    this.combatService.previous();
  }

}
