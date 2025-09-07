import {Routes} from '@angular/router';
import {PartiesComponent} from './parties.component';
import {PartyFormComponent} from './party-form/party-form.component';

export const partiesRoutes = {
  PARTIES: '',
  PARTY_CREATE: 'create',
  PARTY_DETAIL: ':id',
};

export const routes: Routes = [
  {
    path: partiesRoutes.PARTIES,
    component: PartiesComponent,
  },
  {
    path: partiesRoutes.PARTY_CREATE,
    component: PartyFormComponent,
  },
  {
    path: partiesRoutes.PARTY_DETAIL,
    component: PartyFormComponent,
  },
];
