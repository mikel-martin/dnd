import {Component, EventEmitter, input, Output} from '@angular/core';
import type {SideMenuItem} from '../../../../interfaces/sidemenu-item.interface';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatTooltip} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-sidemenu-item',
  imports: [CommonModule, MatIconModule, RouterModule, MatTooltip],
  templateUrl: './sidemenu-item.component.html',
  styleUrl: './sidemenu-item.component.scss',
})
export class SidemenuItemComponent {
  item = input<SideMenuItem>();

  disabled = input<boolean>(false);

  @Output() itemClicked = new EventEmitter<SideMenuItem>();

  click() {
    this.itemClicked.emit(this.item());
  }
}
