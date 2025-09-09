import {inject, Injectable, signal} from '@angular/core';
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import type {GoogleAuth} from '../interfaces/google-auth';
import {Router} from '@angular/router';
import {appRoutes} from '../app.routes';

const AUTH_TOKEN_KEY = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  private router = inject(Router);

  user = signal<GoogleAuth | undefined>(undefined);

  get authToken() {
    return this.user()?.accessToken ?? localStorage.getItem(AUTH_TOKEN_KEY);
  }

  constructor() {
    onAuthStateChanged(this.auth, async firebaseUser => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        this.user.set({
          id: firebaseUser.uid,
          accessToken: token,
          email: firebaseUser.email ?? undefined,
          displayName: firebaseUser.displayName ?? undefined,
          profileImage: firebaseUser.photoURL ?? undefined,
        });
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      } else {
        this.user.set(undefined);
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    });
  }

  async googleLogin(): Promise<GoogleAuth> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    const user: GoogleAuth = {
      id: result.user.uid,
      accessToken: await result.user.getIdToken(),
      email: result.user.email ?? undefined,
      displayName: result.user.displayName ?? undefined,
      profileImage: result.user.photoURL ?? undefined,
    };
    this.user.set(user);
    localStorage.setItem(AUTH_TOKEN_KEY, user.accessToken);
    return user;
  }

  async validSession(): Promise<boolean> {
    return new Promise(resolve => {
      const firebaseAuth = getAuth();
      const unsubscribe = onAuthStateChanged(
        firebaseAuth,
        async currentUser => {
          unsubscribe();
          if (currentUser) {
            const token = await currentUser.getIdToken(true);
            const user: GoogleAuth = {
              id: currentUser.uid,
              accessToken: token,
              email: currentUser.email ?? undefined,
              displayName: currentUser.displayName ?? undefined,
              profileImage: currentUser.photoURL ?? undefined,
            };
            this.user.set(user);
            localStorage.setItem(AUTH_TOKEN_KEY, token);
            resolve(true);
          } else {
            this.user.set(undefined);
            localStorage.removeItem(AUTH_TOKEN_KEY);
            resolve(false);
          }
        }
      );
    });
  }

  logout() {
    this.user.set(undefined);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.router.navigate([appRoutes.AUTH]);
    return signOut(this.auth);
  }
}
