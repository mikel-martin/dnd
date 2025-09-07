import {Component, inject, OnInit} from '@angular/core';
import {CharactersService} from '../../services/characters.service';
import type {Character} from '../../interfaces/characters.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {appRoutes} from '../../app.routes';
import {characterRoutes} from './character.routes';
import {CharacterItemComponent} from '../../shared/components/character-item/character-item.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';

const SEARCH_DEBOUNCE_TIME = 300;

@Component({
  selector: 'app-characters',
  imports: [
    CharacterItemComponent,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  private charactersService = inject(CharactersService);

  private router = inject(Router);

  searchControl = new FormControl('');
  search = '';

  characters: Character[] = [];

  get filteredCharacters(): Character[] {
    if (!this.search) return this.characters;
    return this.characters.filter(character =>
      character.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  ngOnInit() {
    this.charactersService.all().subscribe({
      next: res => (this.characters = res),
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(SEARCH_DEBOUNCE_TIME)) // 300ms de espera
      .subscribe(value => {
        this.search = value || '';
      });
  }

  create() {
    this.router.navigate([
      appRoutes.CHARACTERS,
      characterRoutes.CHARACTER_CREATE,
    ]);
  }
}
