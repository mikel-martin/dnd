import {Component, inject} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {appRoutes} from '../../../app.routes';
import {MatButtonModule} from '@angular/material/button';
import {CombatService} from '../../../services/combat.service';

const REFRESH_TIMEOUT = 500;

@Component({
  selector: 'app-app-layout',
  imports: [RouterModule, MatButtonModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {
  homeRoute = appRoutes.HOME;
  charactersRoute = appRoutes.CHARACTERS;

  private router = inject(Router);

  private combat = inject(CombatService);

  route(route: string) {
    this.router.navigate([route]);
  }

  proyection() {
    window.open(`/${appRoutes.PROYECTION}`, '_blank');
    setTimeout(() => {
      this.combat.refreshProyection();
    }, REFRESH_TIMEOUT);
  }
}
