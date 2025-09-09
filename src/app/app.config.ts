import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {provideAuth, getAuth} from '@angular/fire/auth';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
