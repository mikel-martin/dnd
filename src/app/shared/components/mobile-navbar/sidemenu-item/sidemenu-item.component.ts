import {Component, EventEmitter, input, Output} from '@angular/core';
import type {SideMenuItem} from '../../../../interfaces/sidemenu-item.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-sidemenu-item',
  imports: [RouterModule, MatIconModule, MatRippleModule],
  templateUrl: './sidemenu-item.component.html',
  styleUrl: './sidemenu-item.component.scss',
})
export class SidemenuItemComponent {
  item = input<SideMenuItem>();

  @Output() itemClicked = new EventEmitter<SideMenuItem>();

  click() {
    this.itemClicked.emit(this.item());
  }
}
