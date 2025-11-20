import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';
import type {HttpInterceptorFn} from '@angular/common/http';
import {tap} from 'rxjs';
import {Router} from '@angular/router';
import {appRoutes} from '../app.routes';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.authToken;

  const isFirebase = req.url.startsWith(environment.firebase.databaseURL);

  const cloned =
    token && isFirebase ? req.clone({setParams: {auth: token}}) : req;

  return next(cloned).pipe(
    tap({
      error: err => {
        if (err.status === 401) {
          auth.logout();
          router.navigate([appRoutes.AUTH]);
        }
      },
    })
  );
};
