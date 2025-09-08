import {Component, EventEmitter, inject, Output} from '@angular/core';
import {SidemenuService} from '../../../services/sidemenu.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {SidemenuItemComponent} from './sidemenu-item/sidemenu-item.component';

@Component({
  selector: 'app-mobile-navbar',
  imports: [
    SidemenuItemComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './mobile-navbar.component.html',
  styleUrl: './mobile-navbar.component.scss',
})
export class MobileNavbarComponent {
  @Output() private openProjection = new EventEmitter<void>();

  sidemenu = inject(SidemenuService);

  opened = true;

  itemClicked() {
    this.sidemenu.close();
  }

  projection() {
    this.openProjection.emit();
  }
}
