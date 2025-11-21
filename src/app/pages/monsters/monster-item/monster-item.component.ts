import {Component, input} from '@angular/core';
import type {Monster} from '../../../interfaces/monster.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';

@Component({
  selector: 'app-monster-item',
  imports: [MatIconModule, MatRippleModule],
  templateUrl: './monster-item.component.html',
  styleUrl: './monster-item.component.scss',
})
export class MonsterItemComponent {
  monster = input<Monster>();
}
