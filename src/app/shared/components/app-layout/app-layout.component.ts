import {Component, inject} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {appRoutes} from '../../../app.routes';
import {MatButtonModule} from '@angular/material/button';
import {CombatService} from '../../../services/combat.service';
import {ProyectionService} from '../../../services/proyection.service';
import {ProyectionEventType} from '../../../enums/proyection-event-type.interface';

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

  private proyection = inject(ProyectionService);

  route(route: string) {
    this.router.navigate([route]);
  }

  openProyection() {
    window.open(`/${appRoutes.PROYECTION}`, '_blank');
    setTimeout(() => {
      this.combat.refreshProyection();
      console.log('Opening poryection', this.proyection.backgroundImage());
      this.proyection.emit({
        type: ProyectionEventType.IMAGE,
        data: this.proyection.backgroundImage(),
      });
    }, REFRESH_TIMEOUT);
  }
}
