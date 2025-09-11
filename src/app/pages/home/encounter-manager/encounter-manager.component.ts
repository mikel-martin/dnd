import {Party} from './../../../interfaces/party.interface';
import {Character} from './../../../interfaces/characters.interface';
import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {EncounterTimerComponent} from '../../../shared/components/encounter-timer/encounter-timer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {CharacterItemComponent} from '../../../shared/components/character-item/character-item.component';
import {EncounterService} from '../../../services/encounter.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CharactersService} from '../../../services/characters.service';
import {ProjectionService} from '../../../services/projection.service';
import {ProjectionEventType} from '../../../enums/projection-event-type.interface';
import {MatButtonModule} from '@angular/material/button';
import {PromptService} from '../../../services/prompt.service';
import {PartyService} from '../../../services/party.service';
import {ModalService} from '../../../services/modal.service';
import {AddCharacterModalComponent} from './add-character-modal/add-character-modal.component';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-encounter-manager',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    EncounterTimerComponent,
    CharacterItemComponent,
  ],
  templateUrl: './encounter-manager.component.html',
  styleUrl: './encounter-manager.component.scss',
})
export class EncounterManagerComponent implements OnInit {
  private charactersService = inject(CharactersService);

  private partyService = inject(PartyService);

  private projection = inject(ProjectionService);

  private prompt = inject(PromptService);

  private modal = inject(ModalService);

  encounter = inject(EncounterService);

  parties: Party[] = [];

  characters: Character[] = [];

  showingEncounterMenu = false;

  selectedCharactersControl = new FormControl<Character[]>([]);

  ngOnInit() {
    this.showingEncounterMenu = this.projection.showingEncounterMenu();

    forkJoin({
      characters: this.charactersService.all(),
      parties: this.partyService.all(),
    }).subscribe(({characters, parties}) => {
      this.characters = characters;
      this.parties = parties;
    });
  }

  private _addCharacters(characters: Character[]) {
    this.encounter.addCharacters(characters);
    this.selectedCharactersControl.reset([]);
  }

  clearEncounter() {
    this.modal
      .confirm({
        title: 'Reseting encounter',
        description: 'Are you sure you want reset this encounter?',
      })
      .subscribe(confirm => {
        if (confirm) {
          this.encounter.reset();
        }
      });
  }

  encounterToggleChange(event: any) {
    this.showingEncounterMenu = event.checked;
    this.projection.emit({
      type: ProjectionEventType.COMBAT_VISIBILITY,
      data: event.checked,
    });
  }

  addToEncounter() {
    this.modal
      .modal(
        AddCharacterModalComponent,
        {
          characters: this.characters,
          parties: this.parties,
        },
        {
          minWidth: '600px',
        }
      )
      .subscribe(characters => {
        this._addCharacters(characters);
      });
  }
}
