import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import type {MonsterDetail} from '../../../interfaces/monster-detail.interface';
import {MatExpansionModule} from '@angular/material/expansion';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-monster-detail',
  imports: [MatDialogModule, MatExpansionModule, TitleCasePipe],
  templateUrl: './monster-detail.component.html',
  styleUrl: './monster-detail.component.scss',
})
export class MonsterDetailComponent implements OnInit {
  monster: MonsterDetail = inject(MAT_DIALOG_DATA);

  ngOnInit() {
    console.log(this.monster);
  }

  getStatBonus(value: number): string {
    const bonus = Math.floor((value - 10) / 2);
    return bonus >= 0 ? `+${bonus}` : `${bonus}`;
  }
}
