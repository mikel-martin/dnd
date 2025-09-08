import {Component, inject, OnInit} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {EncounterTimerComponent} from '../../../shared/components/encounter-timer/encounter-timer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {CharacterItemComponent} from '../../../shared/components/character-item/character-item.component';
import {EncounterService} from '../../../services/encounter.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import type {Character} from '../../../interfaces/characters.interface';
import {CharactersService} from '../../../services/characters.service';
import {ProyectionService} from '../../../services/proyection.service';
import {ProyectionEventType} from '../../../enums/proyection-event-type.interface';
import {MatButtonModule} from '@angular/material/button';
import {PromptService} from '../../../services/prompt.service';
import {PartyService} from '../../../services/party.service';
import type {Party} from '../../../interfaces/party.interface';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-encounter-manager',
  imports: [
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

  private proyection = inject(ProyectionService);

  private prompt = inject(PromptService);

  private modal = inject(ModalService);

  encounter = inject(EncounterService);

  parties: Party[] = [];

  characters: Character[] = [];

  showingEncounterMenu = false;

  selectedCharactersControl = new FormControl<Character[]>([]);

  ngOnInit() {
    this.showingEncounterMenu = this.proyection.showingEncounterMenu();

    this.charactersService.all().subscribe({
      next: res => (this.characters = res),
    });

    this.partyService.all().subscribe({
      next: res => (this.parties = res),
    });
  }

  addParty() {
    this.prompt
      .open({
        title: 'Select party',
        description: 'Select the party you want to add to the encounter',
        label: 'Party',
        type: 'select',
        options: this.parties.map(i => ({
          value: i.id,
          label: i.name,
        })),
      })
      .subscribe(partyId => {
        const party = this.parties.find(i => i.id === partyId);
        const partyCharacters = this.characters.filter(i =>
          party?.characters?.includes(i.id || '')
        );
        this.addCharacters(partyCharacters);
      });
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
    this.proyection.emit({
      type: ProyectionEventType.COMBAT_VISIBILITY,
      data: event.checked,
    });
  }

  addCharacters(characters: Character[]) {
    this.encounter.addCharacters(characters);
    this.selectedCharactersControl.reset([]);
  }
}
