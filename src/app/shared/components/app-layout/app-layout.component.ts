import {Component, inject} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {appRoutes} from '../../../app.routes';
import {MatButtonModule} from '@angular/material/button';
import {ProjectionService} from '../../../services/projection.service';
import {ProjectionEventType} from '../../../enums/projection-event-type.interface';
import {EncounterService} from '../../../services/encounter.service';
import {MatIconModule} from '@angular/material/icon';
import {MobileNavbarComponent} from '../mobile-navbar/mobile-navbar.component';

const REFRESH_TIMEOUT = 500;

@Component({
  selector: 'app-app-layout',
  imports: [
    RouterModule,
    MobileNavbarComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {
  homeRoute = appRoutes.HOME;
  partiesRoute = appRoutes.PARTIES;
  charactersRoute = appRoutes.CHARACTERS;

  private router = inject(Router);

  private encounter = inject(EncounterService);

  private projection = inject(ProjectionService);

  showSidemenu = false;

  route(route: string) {
    this.router.navigate([route]);
  }

  openProjection() {
    window.open(`/${appRoutes.PROJECTION}`, '_blank');
    setTimeout(() => {
      this.encounter.refreshProjection();
      this.projection.emit({
        type: ProjectionEventType.IMAGE,
        data: this.projection.backgroundImage(),
      });
    }, REFRESH_TIMEOUT);
  }
}
