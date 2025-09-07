import {Component, inject, OnInit} from '@angular/core';
import {PartyItemComponent} from './party-item/party-item.component';
import {PartyService} from '../../services/party.service';
import type {Party} from '../../interfaces/party.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {PromptService} from '../../services/prompt.service';

@Component({
  selector: 'app-parties',
  imports: [PartyItemComponent, MatButtonModule, MatIconModule],
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.scss',
})
export class PartiesComponent implements OnInit {
  private partyService = inject(PartyService);

  private prompt = inject(PromptService);

  parties: Party[] = [];

  ngOnInit() {
    this.partyService.all().subscribe({
      next: res => (this.parties = res),
    });
  }

  create() {
    this.prompt
      .open({
        title: 'Create party',
        description: "Type the new party's name",
        label: 'Name',
        type: 'text',
      })
      .subscribe(name => {
        if (name) {
          this.partyService.create({name}).subscribe({
            next: res => this.parties.push(res),
          });
        }
      });
  }
}
