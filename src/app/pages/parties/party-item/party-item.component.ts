import {MatIconModule} from '@angular/material/icon';
import {Party} from './../../../interfaces/party.interface';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-party-item',
  imports: [MatIconModule],
  templateUrl: './party-item.component.html',
  styleUrl: './party-item.component.scss',
})
export class PartyItemComponent {
  @Input() party?: Party;

  edit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
