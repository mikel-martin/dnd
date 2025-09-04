import { Routes } from '@angular/router';
import { ProyectionComponent } from './pages/proyection/proyection.component';
import { AppLayoutComponent } from './shared/components/app-layout/app-layout.component';

export const appRoutes = {
    HOME: 'home',
    CHARACTERS: 'characters',
    PROYECTION: 'proyection',
}

export const routes: Routes = [
  {
    path: appRoutes.PROYECTION,
    component: ProyectionComponent,
    loadChildren: () => import('./pages/proyection/proyection.routes').then(m => m.routes)
  },
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path: appRoutes.HOME,
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: appRoutes.CHARACTERS,
        loadComponent: () => import('./pages/characters/characters.component').then(m => m.CharactersComponent)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: appRoutes.HOME
      }
    ]
  },
];
