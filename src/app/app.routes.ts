import {Routes} from '@angular/router';
import {ProjectionComponent} from './pages/projection/projection.component';
import {AppLayoutComponent} from './shared/components/app-layout/app-layout.component';
import {AuthComponent} from './pages/auth/auth.component';
import {authGuard} from './guards/auth.guard';

export const appRoutes = {
  AUTH: 'auth',
  HOME: 'home',
  CHARACTERS: 'characters',
  PROJECTION: 'projection',
  PARTIES: 'parties',
};

export const routes: Routes = [
  {
    path: appRoutes.AUTH,
    component: AuthComponent,
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.routes),
  },
  {
    path: appRoutes.PROJECTION,
    component: ProjectionComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/projection/projection.routes').then(m => m.routes),
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
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
