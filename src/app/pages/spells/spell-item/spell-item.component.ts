import {Component, input} from '@angular/core';
import type {Spell} from '../../../interfaces/spell.interface';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-spell-item',
  imports: [MatIconModule],
  templateUrl: './spell-item.component.html',
  styleUrl: './spell-item.component.scss',
})
export class SpellItemComponent {
  spell = input<Spell>();
}
