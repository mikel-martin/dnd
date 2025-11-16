import {Routes} from '@angular/router';
import {MonstersComponent} from './monsters.component';
import {MonsterDetailComponent} from './monster-detail/monster-detail.component';

export const monstersRoutes = {
  MONSTERS: '',
  DETAIL: ':id',
};

export const routes: Routes = [
  {
    path: monstersRoutes.MONSTERS,
    component: MonstersComponent,
  },
  {
    path: monstersRoutes.DETAIL,
    component: MonsterDetailComponent,
  },
];
