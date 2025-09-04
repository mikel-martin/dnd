import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProyectionService } from '../../services/proyection.service';
import { ProyectionEventType } from '../../enums/proyection-event-type.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileInputComponent } from '../../shared/components/file-input/file-input.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncodingUtils } from '../../shared/utils/encoding.utils';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CharactersService } from '../../services/characters.service';
import type { Character } from '../../interfaces/characters.interface';
import { map, startWith } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CombatService } from '../../services/combat.service';

@Component({
  selector: 'app-home',
  imports: [
    FileInputComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private proyection = inject(ProyectionService);

  private charactersService = inject(CharactersService);

  combat = inject(CombatService);

  selectedCharactersControl = new FormControl<Character[]>([]);

  characters: Character[] = [];

  showingCombatMenu = false;

  ngOnInit() {

    this.showingCombatMenu = this.proyection.showingCombatMenu();

    this.charactersService.all().subscribe({
      next: res => this.characters = res
    });

  }

  clearBackgroundImage() {
    this.proyection.emit({ type: ProyectionEventType.IMAGE, data: null });
  }

  combatToggleChange(event: any) {
    this.showingCombatMenu = event.checked;
    this.proyection.emit({ type: ProyectionEventType.COMBAT_VISIBILITY, data: event.checked });
  }

  async emit(event: Event) {

    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const base64 = await EncodingUtils.toBase64(file);

    this.proyection.emit({ type: ProyectionEventType.IMAGE, data: base64 });

  }

  addCharacters() {
    this.combat.addCharacters(this.selectedCharactersControl.value || []);
    this.selectedCharactersControl.reset();
  }

}

