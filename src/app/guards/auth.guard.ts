import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {appRoutes} from '../app.routes';
import {authRoutes} from '../pages/auth/auth.routes';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.user()) {
    await new Promise(res => setTimeout(res, 200));
  }

  if (auth.user()) {
    return true;
  }

  return router.createUrlTree([appRoutes.AUTH, authRoutes.LOGIN]);
};
