import {Component, inject, OnInit} from '@angular/core';
import {ProjectionService} from '../../services/projection.service';
import {CommonModule} from '@angular/common';
import {EcnounterComponent} from './encounter/encounter.component';
import {EncounterService} from '../../services/encounter.service';
import {ProjectionEventType} from '../../enums/projection-event-type.interface';

@Component({
  selector: 'app-projection',
  imports: [CommonModule, EcnounterComponent],
  templateUrl: './projection.component.html',
  styleUrl: './projection.component.scss',
})
export class ProjectionComponent implements OnInit {
  projection = inject(ProjectionService);

  encounter = inject(EncounterService);

  ngOnInit() {
    this.projection.event$.subscribe(event => {
      if (event.type === ProjectionEventType.IMAGE) {
        this.projection.backgroundImage.set(event.data);
      }
    });
  }
}
