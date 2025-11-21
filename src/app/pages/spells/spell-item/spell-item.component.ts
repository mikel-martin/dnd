import {Component, input} from '@angular/core';
import type {Spell} from '../../../interfaces/spell.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';

@Component({
  selector: 'app-spell-item',
  imports: [MatIconModule, MatRippleModule],
  templateUrl: './spell-item.component.html',
  styleUrl: './spell-item.component.scss',
})
export class SpellItemComponent {
  spell = input<Spell>();
}
