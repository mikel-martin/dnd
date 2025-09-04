import { Component, inject } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';
import type { Character } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-characters',
  imports: [CharacterSheetComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {

  private charactersService = inject(CharactersService);

  characters: Character[] = [];

  ngOnInit() {
    this.charactersService.all().subscribe({
      next: (res) => this.characters = res
    });
  }

}
