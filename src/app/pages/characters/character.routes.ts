import {Routes} from '@angular/router';
import {CharactersComponent} from './characters.component';
import {CharacterFormComponent} from './character-form/character-form.component';

export const characterRoutes = {
  CHARACTERS: '',
  CHARACTER_CREATE: 'create',
  CHARACTER_DETAIL: ':id',
};

export const routes: Routes = [
  {
    path: characterRoutes.CHARACTERS,
    component: CharactersComponent,
  },
  {
    path: characterRoutes.CHARACTER_CREATE,
    component: CharacterFormComponent,
  },
  {
    path: characterRoutes.CHARACTER_DETAIL,
    component: CharacterFormComponent,
  },
];
