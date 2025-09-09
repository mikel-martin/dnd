import {Routes} from '@angular/router';

export const authRoutes = {
  LOGIN: 'login',
};

export const routes: Routes = [
  {
    path: authRoutes.LOGIN,
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
  },
];
