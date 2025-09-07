import {Routes} from '@angular/router';
import {PartiesComponent} from './parties.component';
import {PartyFormComponent} from './party-form/party-form.component';

export const characterRoutes = {
  PARTIES: '',
  PARTY_CREATE: 'create',
  PARTY_DETAIL: ':id',
};

export const routes: Routes = [
  {
    path: characterRoutes.PARTIES,
    component: PartiesComponent,
  },
  {
    path: characterRoutes.PARTY_CREATE,
    component: PartyFormComponent,
  },
  {
    path: characterRoutes.PARTY_DETAIL,
    component: PartyFormComponent,
  },
];
