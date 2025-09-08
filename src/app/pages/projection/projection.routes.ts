import {Routes} from '@angular/router';

const projectionRoutes = {
  PROJECTION: '',
};

export const routes: Routes = [
  {
    path: projectionRoutes.PROJECTION,
    loadComponent: () =>
      import('./projection.component').then(m => m.ProjectionComponent),
  },
];
