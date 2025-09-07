import {Routes} from '@angular/router';
import {PartiesComponent} from './parties.component';

export const characterRoutes = {
  PARTIES: '',
};

export const routes: Routes = [
  {
    path: characterRoutes.PARTIES,
    component: PartiesComponent,
  },
];
