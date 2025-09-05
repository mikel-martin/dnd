import { Component, inject, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import type { Character } from '../../interfaces/characters.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { appRoutes } from '../../app.routes';
import { characterRoutes } from './character.routes';
import { CharacterListItemComponent } from '../../shared/components/character-list-item/character-list-item.component';

@Component({
  selector: 'app-characters',
  imports: [CharacterListItemComponent, MatButtonModule, MatIconModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  private charactersService = inject(CharactersService);

  private router = inject(Router);

  characters: Character[] = [];

  ngOnInit() {
    this.charactersService.all().subscribe({
      next: (res) => (this.characters = res),
    });
  }

  create() {
    this.router.navigate([
      appRoutes.CHARACTERS,
      characterRoutes.CHARACTER_CREATE,
    ]);
  }
}
