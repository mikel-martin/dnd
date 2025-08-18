import { Component, ElementRef, inject, ViewChildren, type QueryList } from '@angular/core';
import { CharacterComponent } from './character/character.component';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CombatCharacter } from '../../interfaces/combat-character.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CombatService } from '../../services/combat.service';
import { CombatTimerComponent } from '../../shared/components/combat-timer/combat-timer.component';

@Component({
  selector: 'app-combat',
  imports: [
    CharacterComponent,
    CombatTimerComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.scss'
})
export class CombatComponent {

  private dialog = inject(MatDialog);

  combatService = inject(CombatService);

  @ViewChildren("character", { read: ElementRef }) characterEls!: QueryList<ElementRef>;

  add() {
    this.dialog.open(CharacterFormComponent, {
      width: "500px"
    });
  }

  next() {
    this.combatService.next();
    this._scrollToSelected();
  }

  previous() {
    this.combatService.previous();
  }

  private _scrollToSelected() {
    const index = this.combatService.activeCharacter;
    const el = this.characterEls.get(index)?.nativeElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

}
