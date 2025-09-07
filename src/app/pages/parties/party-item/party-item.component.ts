import {MatIconModule} from '@angular/material/icon';
import {Party} from './../../../interfaces/party.interface';
import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {appRoutes} from '../../../app.routes';

@Component({
  selector: 'app-party-item',
  imports: [MatIconModule],
  templateUrl: './party-item.component.html',
  styleUrl: './party-item.component.scss',
})
export class PartyItemComponent {
  @Input() party?: Party;

  private router = inject(Router);

  edit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.router.navigate([appRoutes.PARTIES, this.party?.id]);
  }
}
