import {Component, inject, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ActivatedRoute, Router} from '@angular/router';
import {PartyService} from '../../../services/party.service';
import type {Party} from '../../../interfaces/party.interface';
import {MatIconModule} from '@angular/material/icon';
import {appRoutes} from '../../../app.routes';
import {CharactersService} from '../../../services/characters.service';
import type {Character} from '../../../interfaces/characters.interface';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-party-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './party-form.component.html',
  styleUrl: './party-form.component.scss',
})
export class PartyFormComponent implements OnInit {
  private partyService = inject(PartyService);

  private characterService = inject(CharactersService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private modal = inject(ModalService);

  party?: Party;

  characters: Character[] = [];

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    characters: new FormControl<string[]>([], [Validators.required]),
  });

  ngOnInit() {
    this._fetch();
  }

  remove() {
    if (this.party?.id) {
      this.modal
        .confirm({
          title: `Deleting '${this.party.name}'`,
          description: 'Are you sure you want to delete this party?',
          acceptText: 'Yes',
          cancelText: 'No',
        })
        .subscribe(confirm => {
          if (confirm) {
            this.partyService.delete(this.party?.id ?? '').subscribe({
              next: () => this.router.navigate([appRoutes.PARTIES]),
            });
          }
        });
    }
  }

  cancel() {
    this.router.navigate([appRoutes.PARTIES]);
  }

  save() {
    const party: Party = {
      id: this.form.value.id ?? '',
      name: this.form.value.name ?? '',
      characters: this.form.value.characters ?? [],
    };

    if (party.id) {
      this.partyService.update(party).subscribe({
        next: () => {
          this.router.navigate([appRoutes.PARTIES]);
        },
      });
    }
  }

  private _fetch() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.partyService.find(id).subscribe({
        next: res => {
          this.party = res;
          this.party.id = id;
          this._updateForm(id);
        },
      });
    }

    this.characterService.all().subscribe({
      next: res => (this.characters = res),
    });
  }

  private _updateForm(id = '') {
    this.form.patchValue({
      id: id,
      name: this.party?.name,
      characters: this.party?.characters ?? [],
    });
  }
}
