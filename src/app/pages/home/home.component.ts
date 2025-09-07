import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ProyectionService} from '../../services/proyection.service';
import {ProyectionEventType} from '../../enums/proyection-event-type.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EncodingUtils} from '../../shared/utils/encoding.utils';
import {MatExpansionModule} from '@angular/material/expansion';
import {CharactersService} from '../../services/characters.service';
import type {Character} from '../../interfaces/characters.interface';
import {MatSelectModule} from '@angular/material/select';
import {EncounterService} from '../../services/encounter.service';
import {CharacterItemComponent} from '../../shared/components/character-item/character-item.component';
import {EncounterTimerComponent} from '../../shared/components/encounter-timer/encounter-timer.component';
import {GeneralManagerComponent} from './general-manager/general-manager.component';
import {EncounterManagerComponent} from './encounter-manager/encounter-manager.component';

const REFRESH_TIMEOUT = 500;

@Component({
  selector: 'app-home',
  imports: [
    CharacterItemComponent,
    EncounterTimerComponent,
    GeneralManagerComponent,
    EncounterManagerComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private proyection = inject(ProyectionService);

  private charactersService = inject(CharactersService);

  encounter = inject(EncounterService);

  selectedCharactersControl = new FormControl<Character[]>([]);

  characters: Character[] = [];

  showingEncounterMenu = false;

  ngOnInit() {
    this.showingEncounterMenu = this.proyection.showingEncounterMenu();

    this.charactersService.all().subscribe({
      next: res => (this.characters = res),
    });
  }

  refreshCOmbatProyection() {
    setTimeout(() => {
      this.encounter.refreshProyection();
    }, REFRESH_TIMEOUT);
  }

  encounterToggleChange(event: any) {
    this.showingEncounterMenu = event.checked;
    this.proyection.emit({
      type: ProyectionEventType.COMBAT_VISIBILITY,
      data: event.checked,
    });
  }

  clearBackgroundImage() {
    this.proyection.emit({type: ProyectionEventType.IMAGE, data: null});
  }

  async setBackgroundImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const base64 = await EncodingUtils.toBase64(file);

    // this.proyection.backgroundImage.set(base64);
    this.proyection.emit({type: ProyectionEventType.IMAGE, data: base64});
  }

  addCharacters() {
    this.encounter.addCharacters(this.selectedCharactersControl.value || []);
    this.selectedCharactersControl.reset([]);
  }
}
