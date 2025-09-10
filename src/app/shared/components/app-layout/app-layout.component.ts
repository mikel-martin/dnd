import {Component, inject} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {appRoutes} from '../../../app.routes';
import {MatButtonModule} from '@angular/material/button';
import {ProjectionService} from '../../../services/projection.service';
import {ProjectionEventType} from '../../../enums/projection-event-type.interface';
import {EncounterService} from '../../../services/encounter.service';
import {MatIconModule} from '@angular/material/icon';
import {MobileNavbarComponent} from '../mobile-navbar/mobile-navbar.component';
import {AvatarComponent} from '../avatar/avatar.component';
import {MatMenuModule} from '@angular/material/menu';
import {AuthService} from '../../../services/auth.service';
import {SidemenuService} from '../../../services/sidemenu.service';
import {SidemenuItemComponent} from './sidemenu-item/sidemenu-item.component';

const REFRESH_TIMEOUT = 500;

@Component({
  selector: 'app-app-layout',
  imports: [
    SidemenuItemComponent,
    RouterModule,
    MobileNavbarComponent,
    AvatarComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {
  private router = inject(Router);

  private encounter = inject(EncounterService);

  private projection = inject(ProjectionService);

  sidemenu = inject(SidemenuService);

  auth = inject(AuthService);

  appRoutes = appRoutes;

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
