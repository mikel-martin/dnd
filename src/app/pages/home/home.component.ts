import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ProjectionService} from '../../services/projection.service';
import {ProjectionEventType} from '../../enums/projection-event-type.interface';
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
import {GeneralManagerComponent} from './general-manager/general-manager.component';
import {EncounterManagerComponent} from './encounter-manager/encounter-manager.component';

const REFRESH_TIMEOUT = 500;

@Component({
  selector: 'app-home',
  imports: [
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
  private projection = inject(ProjectionService);

  private charactersService = inject(CharactersService);

  encounter = inject(EncounterService);

  selectedCharactersControl = new FormControl<Character[]>([]);

  characters: Character[] = [];

  showingEncounterMenu = false;

  ngOnInit() {
    this.showingEncounterMenu = this.projection.showingEncounterMenu();

    this.charactersService.all().subscribe({
      next: res => (this.characters = res),
    });
  }

  refreshCOmbatProjection() {
    setTimeout(() => {
      this.encounter.refreshProjection();
    }, REFRESH_TIMEOUT);
  }

  encounterToggleChange(event: any) {
    this.showingEncounterMenu = event.checked;
    this.projection.emit({
      type: ProjectionEventType.COMBAT_VISIBILITY,
      data: event.checked,
    });
  }

  clearBackgroundImage() {
    this.projection.emit({type: ProjectionEventType.IMAGE, data: null});
  }

  async setBackgroundImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const base64 = await EncodingUtils.toBase64(file);

    // this.projection.backgroundImage.set(base64);
    this.projection.emit({type: ProjectionEventType.IMAGE, data: base64});
  }

  addCharacters() {
    this.encounter.addCharacters(this.selectedCharactersControl.value || []);
    this.selectedCharactersControl.reset([]);
  }
}
