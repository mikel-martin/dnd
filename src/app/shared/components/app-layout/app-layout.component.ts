import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../../../app.routes';

@Component({
  selector: 'app-app-layout',
  imports: [RouterModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {

  homeRoute = appRoutes.HOME;
  charactersRoute = appRoutes.CHARACTERS;
  proyectionRoute = appRoutes.PROYECTION;

}
