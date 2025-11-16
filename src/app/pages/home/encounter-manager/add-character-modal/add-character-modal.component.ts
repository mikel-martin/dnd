import {
  CharacterType,
  CharacterTypes,
} from './../../../../enums/character-type.enum';
import {Component, inject, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule, type MatTabChangeEvent} from '@angular/material/tabs';
import type {Character} from '../../../../interfaces/characters.interface';
import type {Party} from '../../../../interfaces/party.interface';
import {EncounterService} from '../../../../services/encounter.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import type {Monster} from '../../../../interfaces/monster.interface';
import {MonstersService} from '../../../../services/monsters/monsters.service';
import {MatInputModule} from '@angular/material/input';

interface Data {
  characters: Character[];
  parties: Party[];
}

@Component({
  selector: 'app-add-character-modal',
  imports: [
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './add-character-modal.component.html',
  styleUrl: './add-character-modal.component.scss',
})
export class AddCharacterModalComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<AddCharacterModalComponent>);

  data: Data = inject(MAT_DIALOG_DATA);

  encounter = inject(EncounterService);

  monstersService = inject(MonstersService);

  monsters: Monster[] = [];

  form = new FormGroup({
    party: new FormControl<Party | undefined>(undefined, [Validators.required]),
    characters: new FormControl<Character[]>([], [Validators.required]),
    monster: new FormGroup({
      monster: new FormControl<Monster | undefined>(undefined, [
        Validators.required,
      ]),
      amount: new FormControl<number>(1, [Validators.min(1)]),
      type: new FormControl<CharacterType>(CharacterType.NEUTRAL),
    }),
  });

  selectedTabIndex = 0;

  characterTypes = CharacterTypes;

  get validForm(): boolean {
    if (this.selectedTabIndex === 0) {
      return this.form.get('characters')?.valid || false;
    } else if (this.selectedTabIndex === 1) {
      return this.form.get('party')?.valid || false;
    } else if (this.selectedTabIndex === 2) {
      return this.form.get('monster')?.valid || false;
    }
    return false;
  }

  ngOnInit() {
    this.monstersService.all().subscribe({
      next: res => (this.monsters = res),
    });
  }

  getPartyCharacters(party: Party) {
    const partyCharacters = this.data.characters.filter(i =>
      party?.characters?.includes(i.id || '')
    );
    this.dialogRef.close(partyCharacters ?? []);
  }

  add() {
    let result: Character[] = [];
    if (this.selectedTabIndex === 0) {
      // Characters
      result = this.form.get('characters')?.value ?? [];
      this.dialogRef.close(result);
    } else if (this.selectedTabIndex === 1) {
      // Parties
      result =
        this.data.characters.filter(i =>
          this.form.get('party')?.value?.characters?.includes(i.id || '')
        ) ?? [];
      this.dialogRef.close(result);
    } else if (this.selectedTabIndex === 2) {
      // Monsters

      const monsterForm = this.form.get('monster');
      const selected = monsterForm?.get('monster')?.value;
      const amount = monsterForm?.get('amount')?.value ?? 1;
      const type = monsterForm?.get('type')?.value;

      if (selected) {
        this.monstersService.detail(selected.id).subscribe({
          next: monster => {
            const existing = this.encounter
              .characters()
              .filter(c => c.monsterId === selected.id);
            const lastIndex = existing.length;
            result = Array.from(
              {length: amount},
              (_, index) =>
                ({
                  type,
                  id: `${monster.id}-${lastIndex + index + 1}`,
                  monsterId: monster.id,
                  name: `${monster.name} ${lastIndex + index + 1 > 1 ? lastIndex + index + 1 : ''}`.trim(),
                  maxHitPoints: monster.hitPoints,
                  currentHitPoints: monster.hitPoints,
                  passivePerception: 10 + monster.wisdom,
                  classArmour: monster.armorClass.value,
                }) as Character
            );
            this.dialogRef.close(result);
          },
        });
        return;
      }
    }
  }

  tabChanged(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;
  }
}
