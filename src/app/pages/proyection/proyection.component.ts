import {Component, inject, OnInit} from '@angular/core';
import {ProyectionService} from '../../services/proyection.service';
import {CommonModule} from '@angular/common';
import {EcnounterComponent} from './encounter/encounter.component';
import {EncounterService} from '../../services/encounter.service';
import {ProyectionEventType} from '../../enums/proyection-event-type.interface';

@Component({
  selector: 'app-proyection',
  imports: [CommonModule, EcnounterComponent],
  templateUrl: './proyection.component.html',
  styleUrl: './proyection.component.scss',
})
export class ProyectionComponent implements OnInit {
  proyection = inject(ProyectionService);

  encounter = inject(EncounterService);

  ngOnInit() {
    this.proyection.event$.subscribe(event => {
      if (event.type === ProyectionEventType.IMAGE) {
        this.proyection.backgroundImage.set(event.data);
      }
    });
  }
}
