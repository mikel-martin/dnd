import {Component, type ElementRef, ViewChild, inject} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {appRoutes} from '../../../app.routes';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  private authService = inject(AuthService);

  private router = inject(Router);

  async loginWithGoogle() {
    await this.authService.googleLogin();
    this.router.navigate([appRoutes.HOME]);
  }
}
