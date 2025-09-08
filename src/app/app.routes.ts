import {Routes} from '@angular/router';
import {ProjectionComponent} from './pages/projection/projection.component';
import {AppLayoutComponent} from './shared/components/app-layout/app-layout.component';

export const appRoutes = {
  HOME: 'home',
  CHARACTERS: 'characters',
  PROJECTION: 'projection',
  PARTIES: 'parties',
};

export const routes: Routes = [
  {
    path: appRoutes.PROJECTION,
    component: ProjectionComponent,
    loadChildren: () =>
      import('./pages/projection/projection.routes').then(m => m.routes),
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: appRoutes.HOME,
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: appRoutes.CHARACTERS,
        loadChildren: () =>
          import('./pages/characters/character.routes').then(m => m.routes),
      },
      {
        path: appRoutes.PARTIES,
        loadChildren: () =>
          import('./pages/parties/parties.routes').then(m => m.routes),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: appRoutes.HOME,
      },
    ],
  },
];
