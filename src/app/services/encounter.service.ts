import {inject, Injectable, signal} from '@angular/core';
import type {EncounterCharacter} from '../interfaces/encounter-character.interface';
import type {Character} from '../interfaces/characters.interface';
import {ProyectionService} from './proyection.service';
import {ProyectionEventType} from '../enums/proyection-event-type.interface';
import {CharactersService} from './characters.service';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {
  private _roundCounter = 1;

  private _activeCharacterIndex = 0;

  characters = signal<Character[]>([]);

  private _characterService = inject(CharactersService);

  private _proyection = inject(ProyectionService);

  get activeCharacterIndex(): number {
    return this._activeCharacterIndex;
  }

  get activeCharacter(): Character | undefined {
    return this.characters()[this._activeCharacterIndex];
  }

  set activeCharacter(character: Character) {
    let index = this.characters()
      .map(i => i.id)
      .indexOf(character.id);
    if (index < 0) {
      index = 0;
    }
    this._activeCharacterIndex = index;
  }

  get roundCounter(): number {
    return this._roundCounter ?? 0;
  }

  constructor() {
    this._initialize();
  }

  private _initialize(): void {
    this._activeCharacterIndex = 0;

    this._characterService.charactersChanged$.subscribe(characters =>
      this.refresh(characters)
    );
  }

  refresh(characters: Character[]) {
    const encounter = this.characters();

    const result = encounter.map(character => {
      const char = characters.find(c => c.id === character.id);
      if (char) {
        return char;
      }
      return character;
    });

    result.sort((a, b) => (b.initiative ?? 0) - (a.initiative ?? 0));

    this.characters.set(result);

    this.refreshProyection();
  }

  addCharacters(characters: Character[]): void {
    const result = this.characters();

    const existingIds = new Set(this.characters().map(c => c.id));

    const newCharacters = characters
      .filter(c => !existingIds.has(c.id))
      .map(i => {
        i.initiative = undefined;
        i.states = [];
        return i;
      });

    if (newCharacters.length === 0) {
      return;
    }

    result.push(...newCharacters);
    result.sort((a, b) => (b.initiative ?? 0) - (a.initiative ?? 0));

    if (result.length === 1) {
      this._activeCharacterIndex = 0;
    }

    this.characters.set(result);

    this.refreshProyection();
  }

  reset(): void {
    this.characters.set([]);
    this.refreshProyection();
  }

  updateCharacterInfo(characters: Character[]) {
    characters = this._characterService.characters();

    const currentCharacters = this.characters();

    const result = currentCharacters.map(character => {
      const char = characters.find(c => c.id === character.id);
      if (char) {
        return char;
      }
      return character;
    });

    result.sort((a, b) => (b.initiative ?? 0) - (a.initiative ?? 0));

    this.refreshProyection();
  }

  characterInEncounter(character: Character): boolean {
    return this.characters().find(i => i.id === character.id) === undefined;
  }

  remove(character: EncounterCharacter): void {
    this.characters.set([
      ...this.characters().filter(c => c.id !== character.id),
    ]);

    this.refreshProyection();
  }

  next(): void {
    if (this.characters().length === 0) {
      return;
    }

    if (this._activeCharacterIndex == undefined) {
      this._activeCharacterIndex = 1;
    } else {
      this._activeCharacterIndex += 1;
    }

    if (this._activeCharacterIndex >= this.characters().length) {
      this._activeCharacterIndex = 0;
      this._roundCounter += 1;
    }

    this.refreshProyection();
  }

  previous(): void {
    if (this.characters().length === 0) {
      return;
    }

    if (this._activeCharacterIndex == undefined) {
      this._activeCharacterIndex = 1;
    } else {
      this._activeCharacterIndex -= 1;
    }

    if (this._activeCharacterIndex < 0) {
      this._activeCharacterIndex = this.characters().length - 1;
      this._roundCounter -= 1;

      if (this.roundCounter < 1) {
        this._roundCounter = 1;
        this._activeCharacterIndex = 0;
      }
    }

    this.refreshProyection();
  }

  refreshProyection() {
    this._proyection.emit({
      type: ProyectionEventType.COMBAT_UPDATE,
      data: this.characters(),
    });
    this._proyection.emit({
      type: ProyectionEventType.COMBAT_ACTIVE_CHARACTER,
      data: this.activeCharacter,
    });
  }
}
