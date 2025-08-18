import { inject, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import type { CombatCharacter } from '../interfaces/combat-character.interface';
import { CharacterStatusService } from './character-status.service';

@Injectable({
  providedIn: 'root'
})
export class CombatService {

  private _roundCounter = 1;

  private _activeCharacter?: number;

  private _characters: CombatCharacter[] = [];

  // private _characters: CombatCharacter[] = [
  //   {
  //     id: uuidv4(),
  //     name: 'Kethan',
  //     initiative: 15
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Drakthar',
  //     initiative: 12
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Karlox',
  //     initiative: 15
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Grothar',
  //     initiative: 12
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Warrior',
  //     initiative: 15
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Mage',
  //     initiative: 12
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Warrior',
  //     initiative: 15
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Mage',
  //     initiative: 12
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Warrior',
  //     initiative: 15
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Mage',
  //     initiative: 12
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Warrior',
  //     initiative: 15
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Mage',
  //     initiative: 12
  //   },
  // ];

  private _statusService = inject(CharacterStatusService);

  get characters(): CombatCharacter[] {
    return this._characters;
  }

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

  add(character: CombatCharacter): void {
    character.id = uuidv4();
    this._characters.push(character);
    this._characters.sort((a, b) => (b.initiative ?? 0) - (a.initiative ?? 0));

    if (this._characters.length === 1) {
      this._activeCharacter = 0;
    }

  }

  remove(character: CombatCharacter): void {
    this._characters = [...this._characters.filter(c => c.id !== character.id)];
  }

  setStatus(statusId: string, characterid: string): void {
    const status = this._statusService.find(statusId);
    const character = this._characters.find(c => c.id === characterid);
    if (status && character) {
      character.status = status;
    }
  }

  removeStatus(characterid: string): void {
    const character = this._characters.find(c => c.id === characterid);
    if (character) {
      character.status = undefined;
    }
  }

  next(): void {

    if (this._characters.length === 0) {
      return;
    }

    if (this._activeCharacter == undefined) {
      this._activeCharacter = 1;
    } else {
      this._activeCharacter += 1;
    }

    if (this._activeCharacter >= this._characters.length) {
      this._activeCharacter = 0;
      this._roundCounter += 1;
    }

  }

  previous(): void {

    if (this._characters.length === 0) {
      return;
    }

    if (this._activeCharacter == undefined) {
      this._activeCharacter = 1;
    } else {
      this._activeCharacter -= 1;
    }

    if (this._activeCharacter < 0) {
      this._activeCharacter = this._characters.length - 1;
      this._roundCounter -= 1;

      if (this.roundCounter < 1) {
        this._roundCounter = 1;
        this._activeCharacter = 0;
      }

    }

  }

}
