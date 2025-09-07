import {Component, inject, OnInit} from '@angular/core';
import {CharactersService} from '../../../services/characters.service';
import type {Character} from '../../../interfaces/characters.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {
  CharacterType,
  CharacterTypes,
} from '../../../enums/character-type.enum';
import {appRoutes} from '../../../app.routes';

@Component({
  selector: 'app-character-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.scss',
})
export class CharacterFormComponent implements OnInit {
  private characters = inject(CharactersService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  characterTypes = CharacterTypes;

  character?: Character;

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    type: new FormControl(CharacterType.NEUTRAL, [Validators.required]),
    maxhitPoints: new FormControl(),
    passivePerception: new FormControl(),
    classArmour: new FormControl(),
    savingThrow: new FormControl(),
  });

  ngOnInit() {
    this._fetch();
  }

  cancel() {
    this.router.navigate([appRoutes.CHARACTERS]);
  }

  save() {
    const character: Character = {
      id: this.form.value.id ?? '',
      name: this.form.value.name ?? '',
      type: this.form.value.type ?? CharacterType.NEUTRAL,
      maxHitPoints: this.form.value.maxhitPoints ?? 0,
      currentHitPoints: this.form.value.maxhitPoints ?? 0,
      passivePerception: this.form.value.passivePerception ?? 0,
      classArmour: this.form.value.classArmour ?? 0,
      savingThrow: this.form.value.savingThrow ?? 0,
    };

    if (character.id) {
      this.characters.update(character).subscribe({
        next: () => {
          this.router.navigate([appRoutes.CHARACTERS]);
        },
      });
    } else {
      this.characters.create(character).subscribe({
        next: () => {
          this.router.navigate([appRoutes.CHARACTERS]);
        },
      });
    }
  }

  remove() {
    if (
      this.character?.id &&
      confirm('Are you sure you want to delete this character?')
    ) {
      this.characters.delete(this.character.id).subscribe({
        next: () => this.router.navigate([appRoutes.CHARACTERS]),
      });
    }
  }

  private _fetch() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characters.find(id).subscribe({
        next: res => {
          this.character = res;
          this.character.id = id;
          this._updateForm(id);
        },
      });
    }
  }

  private _updateForm(id = '') {
    this.form.patchValue({
      id: id,
      name: this.character?.name,
      type: this.character?.type,
      maxhitPoints: this.character?.maxHitPoints ?? 0,
      passivePerception: this.character?.passivePerception ?? 0,
      classArmour: this.character?.classArmour ?? 0,
      savingThrow: this.character?.savingThrow ?? 0,
    });
  }
}
