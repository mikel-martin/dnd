import {Component, inject, OnInit} from '@angular/core';
import {SpellsService} from '../../services/spells.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';
import type {Spell} from '../../interfaces/spell.interface';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SpellItemComponent} from './spell-item/spell-item.component';
import {ModalService} from '../../services/modal.service';
import {SpellDetailComponent} from './spell-detail/spell-detail.component';

const SEARCH_DEBOUNCE_TIME = 300;

@Component({
  selector: 'app-spells',
  imports: [
    SpellItemComponent,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss',
})
export class SpellsComponent implements OnInit {
  private spellsService = inject(SpellsService);

  private modal = inject(ModalService);

  searchControl = new FormControl('');
  search = '';

  spells: Spell[] = [];

  get filteredSpells(): Spell[] {
    if (!this.search) return this.spells;
    return this.spells.filter(character =>
      character.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  ngOnInit() {
    this.spellsService.all().subscribe({
      next: res => (this.spells = res),
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(SEARCH_DEBOUNCE_TIME))
      .subscribe(value => {
        this.search = value || '';
      });
  }

  detail(spell: Spell) {
    this.spellsService.search(spell).subscribe({
      next: res => {
        this.modal.modal(res.name, SpellDetailComponent, res);
      },
    });
  }
}
