import {Component, inject, OnInit} from '@angular/core';
import {ProyectionService} from '../../services/proyection.service';
import {CommonModule} from '@angular/common';
import {CombatComponent} from '../combat/combat.component';
import {CombatService} from '../../services/combat.service';
import {ProyectionEventType} from '../../enums/proyection-event-type.interface';

@Component({
  selector: 'app-proyection',
  imports: [CommonModule, CombatComponent],
  templateUrl: './proyection.component.html',
  styleUrl: './proyection.component.scss',
})
export class ProyectionComponent implements OnInit {
  proyection = inject(ProyectionService);

  combat = inject(CombatService);

  ngOnInit() {
    this.proyection.event$.subscribe(event => {
      if (event.type === ProyectionEventType.IMAGE) {
        this.proyection.backgroundImage.set(event.data);
      }
    });
  }
}
