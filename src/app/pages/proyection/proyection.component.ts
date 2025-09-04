import { Component, inject } from '@angular/core';
import { ProyectionService } from '../../services/proyection.service';
import { CommonModule } from '@angular/common';
import { CombatComponent } from '../combat/combat.component';
import { CombatService } from '../../services/combat.service';

@Component({
  selector: 'app-proyection',
  imports: [CommonModule, CombatComponent],
  templateUrl: './proyection.component.html',
  styleUrl: './proyection.component.scss',
})
export class ProyectionComponent {

  proyection = inject(ProyectionService);

  combat = inject(CombatService);

}
