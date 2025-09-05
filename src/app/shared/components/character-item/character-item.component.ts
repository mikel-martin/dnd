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

@Component({
  selector: 'app-character-item',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './character-item.component.html',
  styleUrl: './character-item.component.scss',
})
export class CharacterItemComponent {
  private characters = inject(CharactersService);

  private router = inject(Router);

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

  edit() {
    this.router.navigate([appRoutes.CHARACTERS, this.character?.id]);
  }
}
