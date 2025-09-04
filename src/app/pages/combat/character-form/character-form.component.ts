import { CombatCharacter } from './../../../interfaces/combat-character.interface';
import { Component, inject, ViewChild, type ElementRef } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CombatService } from '../../../services/combat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-character-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.scss'
})
export class CharacterFormComponent {

  name: string = '';

  initiative?: number;

  private _snackbar = inject(MatSnackBar);

  private _combatService = inject(CombatService);

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  valid(): boolean {
    return this.name.trim().length > 0 && this.initiative !== undefined;
  }

  onEnter(event: any) {
    if (this.valid()) {
      event.preventDefault();
      this.submit(this.nameInput.nativeElement);
    }
  }

  clear() {
    this.name = '';
    this.initiative = undefined;
  }

  submit(nameInput: HTMLInputElement) {
    const character: CombatCharacter = {
      name: this.name.trim(),
      initiative: this.initiative ?? 0
    }
    this._combatService.add(character);
    this.clear();
    setTimeout(() => {
      nameInput.focus();
    }, 0);
    this.successSnackbar();
  }

  successSnackbar() {
    this._snackbar.open("Character added successfully", "Close", {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

}
