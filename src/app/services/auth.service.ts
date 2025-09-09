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

const AUTH_TOKEN_KEY = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

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

  async getUserFromIdToken(idToken: string): Promise<GoogleAuth | undefined> {
    const firebaseAuth = getAuth();
    const currentUser = firebaseAuth.currentUser;
    console.log('currentUser', currentUser);
    if (currentUser) {
      const user: GoogleAuth = {
        id: currentUser.uid,
        accessToken: idToken,
        email: currentUser.email ?? undefined,
        displayName: currentUser.displayName ?? undefined,
        profileImage: currentUser.photoURL ?? undefined,
      };
      this.user.set(user);
      return user;
    }
    return undefined;
  }

  logout() {
    this.user.set(undefined);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return signOut(this.auth);
  }
}
