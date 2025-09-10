import {Component, EventEmitter, input, Output} from '@angular/core';
import type {SideMenuItem} from '../../../../interfaces/sidemenu-item.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-mobile-sidemenu-item',
  imports: [CommonModule, RouterModule, MatIconModule, MatRippleModule],
  templateUrl: './mobile-sidemenu-item.component.html',
  styleUrl: './mobile-sidemenu-item.component.scss',
})
export class MobileSidemenuItemComponent {
  item = input<SideMenuItem>();

  disabled = input<boolean>(false);

  @Output() itemClicked = new EventEmitter<SideMenuItem>();

  click() {
    this.itemClicked.emit(this.item());
  }
}
