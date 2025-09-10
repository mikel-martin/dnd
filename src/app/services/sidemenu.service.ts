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
      icon: 'castle',
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
    {
      id: 'monster',
      label: 'Monsters',
      icon: 'skull',
      routerLink: [appRoutes.MONSTERS],
    },
    {
      id: 'spells',
      label: 'Spells',
      icon: 'wand_stars',
      routerLink: [appRoutes.SPELLS],
    },
  ];

  readonly projectionItem: SideMenuItem = {
    id: 'projection',
    label: 'Projection',
    icon: 'monitor',
    target: '_blank',
  };

  readonly settingsItem: SideMenuItem = {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    routerLink: [appRoutes.SETTINGS],
  };

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
