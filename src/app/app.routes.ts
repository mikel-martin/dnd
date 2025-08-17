import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const appRoutes = {
    HOME: 'home',
    COMBAT: 'combat',
}

export const routes: Routes = [
    {
        path: appRoutes.COMBAT,
        loadComponent: () => import('./pages/combat/combat.component').then(m => m.CombatComponent)
    },
    {
        path: appRoutes.HOME,
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: appRoutes.HOME
    }
];
