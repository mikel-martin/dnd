import { inject, Injectable, signal } from '@angular/core';
import type { CombatCharacter } from '../interfaces/combat-character.interface';
import { CharacterStatusService } from './character-status.service';
import type { Character } from '../interfaces/characters.interface';
import { ProyectionService } from './proyection.service';
import { ProyectionEventType } from '../enums/proyection-event-type.interface';

@Injectable({
  providedIn: 'root',
})
export class CombatService {
  private _roundCounter = 1;

  private _activeCharacter?: number;

  characters = signal<Character[]>([]);

  private _statusService = inject(CharacterStatusService);

  private _proyection = inject(ProyectionService);

  get activeCharacter(): number {
    return this._activeCharacter ?? -1;
  }

  get roundCounter(): number {
    return this._roundCounter ?? 0;
  }

  constructor() {
    this._initialize();
  }

  private _initialize(): void {
    this._activeCharacter = 0;
  }

  addCharacters(characters: Character[]): void {
    const result = this.characters();

    const existingIds = new Set(this.characters().map((c) => c.id));

    const newCharacters = characters
      .filter((c) => !existingIds.has(c.id))
      .map((i) => {
        i.initiative = undefined;
        return i;
      });

    if (newCharacters.length === 0) {
      return;
    }

    result.push(...newCharacters);
    result.sort((a, b) => (b.initiative ?? 0) - (a.initiative ?? 0));

    if (result.length === 1) {
      this._activeCharacter = 0;
    }

    this.characters.set(result);

    this._proyection.emit({
      type: ProyectionEventType.COMBAT_UPDATE,
      data: result,
    });
  }

  updateCharacterInfo(characters: Character[]) {
    const currentCharacters = this.characters();

    const result = currentCharacters.map((character) => {
      const char = characters.find((c) => c.id === character.id);
      if (char) {
        return char;
      }
      return character;
    });

    this._proyection.emit({
      type: ProyectionEventType.COMBAT_UPDATE,
      data: result,
    });
  }

  characterInCombat(character: Character): boolean {
    return this.characters().find((i) => i.id === character.id) === undefined;
  }

  remove(character: CombatCharacter): void {
    this.characters.set([
      ...this.characters().filter((c) => c.id !== character.id),
    ]);

    this._proyection.emit({
      type: ProyectionEventType.COMBAT_UPDATE,
      data: this.characters(),
    });
  }

  setStatus(statusId: string, characterid: string): void {
    const status = this._statusService.find(statusId);
    const character = this.characters().find((c) => c.id === characterid);
    if (status && character) {
      character.states = [status];
    }
  }

  removeStatus(characterid: string): void {
    const character = this.characters().find((c) => c.id === characterid);
    if (character) {
      character.states = [];
    }
  }

  next(): void {
    if (this.characters.length === 0) {
      return;
    }

    if (this._activeCharacter == undefined) {
      this._activeCharacter = 1;
    } else {
      this._activeCharacter += 1;
    }

    if (this._activeCharacter >= this.characters.length) {
      this._activeCharacter = 0;
      this._roundCounter += 1;
    }
  }

  previous(): void {
    if (this.characters.length === 0) {
      return;
    }

    if (this._activeCharacter == undefined) {
      this._activeCharacter = 1;
    } else {
      this._activeCharacter -= 1;
    }

    if (this._activeCharacter < 0) {
      this._activeCharacter = this.characters.length - 1;
      this._roundCounter -= 1;

      if (this.roundCounter < 1) {
        this._roundCounter = 1;
        this._activeCharacter = 0;
      }
    }
  }
}
