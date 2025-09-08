import {Injectable} from '@angular/core';
import type {SideMenuItem} from '../interfaces/sidemenu-item.interface';
import {appRoutes} from '../app.routes';

@Injectable({
  providedIn: 'root',
})
export class SidemenuService {
  private _opened = false;

  readonly sidemenuItems: SideMenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      routerLink: [appRoutes.HOME],
    },
    {
      id: 'characters',
      label: 'Characters',
      icon: 'person',
      routerLink: [appRoutes.CHARACTERS],
    },
    {
      id: 'parties',
      label: 'Parties',
      icon: 'group',
      routerLink: [appRoutes.PARTIES],
    },
  ];

  get isOpened(): boolean {
    return this._opened;
  }

  open() {
    this._opened = true;
  }

  close() {
    this._opened = false;
  }
}
