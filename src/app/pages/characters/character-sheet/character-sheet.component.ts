import { Component, input, ViewEncapsulation } from '@angular/core';
import type { Character } from '../../../interfaces/characters.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-sheet',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CharacterSheetComponent {

  character = input<Character>();

  edit() {

  }

}
