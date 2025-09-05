import { Routes } from '@angular/router';

const proyectionRoutes = {
  PROYECTION: '',
};

export const routes: Routes = [
  {
    path: proyectionRoutes.PROYECTION,
    loadComponent: () => import("./proyection.component").then(m => m.ProyectionComponent)
  },
];
