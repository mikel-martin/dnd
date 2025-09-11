import {Component, inject, OnInit} from '@angular/core';
import {MonstersService} from '../../services/monsters/monsters.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';
import type {Monster} from '../../interfaces/monster.interface';
import {ModalService} from '../../services/modal.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MonsterItemComponent} from './monster-item/monster-item.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MonsterDetailComponent} from './monster-detail/monster-detail.component';

const SEARCH_DEBOUNCE_TIME = 300;

@Component({
  selector: 'app-monsters',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MonsterItemComponent,
    MatAutocompleteModule,
    MatButtonModule,
  ],
  templateUrl: './monsters.component.html',
  styleUrl: './monsters.component.scss',
})
export class MonstersComponent implements OnInit {
  private monstersService = inject(MonstersService);

  private modal = inject(ModalService);

  searchControl = new FormControl('');
  searchInput = '';

  monsters: Monster[] = [];

  get filteredMonsters(): Monster[] {
    if (!this.searchInput) return this.monsters;
    return this.monsters.filter(character =>
      character.name.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

  ngOnInit() {
    this.monstersService.all().subscribe({
      next: res => (this.monsters = res),
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(SEARCH_DEBOUNCE_TIME))
      .subscribe(value => {
        this.searchInput = value || '';
      });
  }

  detail(monster: Monster) {
    this.monstersService.detail(monster).subscribe({
      next: res => {
        this.modal.modal(MonsterDetailComponent, res, {
          with: '600px',
        });
      },
    });
  }
}
