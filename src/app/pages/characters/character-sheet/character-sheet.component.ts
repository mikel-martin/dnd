import { CharacterType, CharacterTypes } from './../../../enums/character-type.enum';
import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import type { Character } from '../../../interfaces/characters.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { appRoutes } from '../../../app.routes';

@Component({
  selector: 'app-character-sheet',
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.scss'
})
export class CharacterSheetComponent {

  private router = inject(Router);

  character = input<Character>();

  typeLabel(type: CharacterType = CharacterType.NEUTRAL) {
    return CharacterTypes.find(t => t.value === type)?.label;
  }

  edit() {
    this.router.navigate([appRoutes.CHARACTERS, this.character()?.id]);
  }

}
