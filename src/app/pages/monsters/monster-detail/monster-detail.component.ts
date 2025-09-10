import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import type {MonsterDetail} from '../../../interfaces/monster-detail.interface';

@Component({
  selector: 'app-monster-detail',
  imports: [MatDialogModule],
  templateUrl: './monster-detail.component.html',
  styleUrl: './monster-detail.component.scss',
})
export class MonsterDetailComponent {
  monster: MonsterDetail = inject(MAT_DIALOG_DATA);
}
