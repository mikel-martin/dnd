import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import type {MonsterDetail} from '../../../interfaces/monster-detail.interface';
import {MatExpansionModule} from '@angular/material/expansion';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MonstersService} from '../../../services/monsters/monsters.service';
import {monstersRoutes} from '../monsters.routes';

@Component({
  selector: 'app-monster-detail',
  imports: [CommonModule, MatDialogModule, MatExpansionModule, TitleCasePipe],
  templateUrl: './monster-detail.component.html',
  styleUrl: './monster-detail.component.scss',
})
export class MonsterDetailComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);

  private _router = inject(Router);

  private _monsterService = inject(MonstersService);

  id?: string;

  monster: MonsterDetail = inject(MAT_DIALOG_DATA, {optional: true});

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') || undefined;
    if (this.id) {
      this._monsterService.detail(this.id).subscribe({
        next: monster => (this.monster = monster),
        error: () => this._router.navigate([monstersRoutes.MONSTERS]),
      });
    }
  }

  getStatBonus(value: number): string {
    const bonus = Math.floor((value - 10) / 2);
    return bonus >= 0 ? `+${bonus}` : `${bonus}`;
  }
}
