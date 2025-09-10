import {Routes} from '@angular/router';
import {MonstersComponent} from './monsters.component';

export const monstersRoutes = {
  MONSTERS: '',
};

export const routes: Routes = [
  {
    path: monstersRoutes.MONSTERS,
    component: MonstersComponent,
  },
];
