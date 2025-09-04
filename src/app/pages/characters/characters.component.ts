import { Component, inject } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';
import type { Character } from '../../interfaces/characters.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { appRoutes } from '../../app.routes';
import { characterRoutes } from './character.routes';

@Component({
  selector: 'app-characters',
  imports: [
    CharacterSheetComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {

  private charactersService = inject(CharactersService);

  private router = inject(Router);

  characters: Character[] = [];

  ngOnInit() {
    this.charactersService.all().subscribe({
      next: (res) => this.characters = res
    });
  }

  create() {
    this.router.navigate([appRoutes.CHARACTERS, characterRoutes.CHARACTER_CREATE]);
  }

}
