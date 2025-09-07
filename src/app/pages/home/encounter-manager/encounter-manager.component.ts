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

  private proyection = inject(ProyectionService);

  encounter = inject(EncounterService);

  characters: Character[] = [];

  showingEncounterMenu = false;

  selectedCharactersControl = new FormControl<Character[]>([]);

  ngOnInit() {
    this.showingEncounterMenu = this.proyection.showingEncounterMenu();

    this.charactersService.all().subscribe({
      next: res => (this.characters = res),
    });
  }

  encounterToggleChange(event: any) {
    this.showingEncounterMenu = event.checked;
    this.proyection.emit({
      type: ProyectionEventType.COMBAT_VISIBILITY,
      data: event.checked,
    });
  }

  addCharacters() {
    this.encounter.addCharacters(this.selectedCharactersControl.value || []);
    this.selectedCharactersControl.reset([]);
  }
}
