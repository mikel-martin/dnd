import { Component, inject } from '@angular/core';
import { ProyectionService } from '../../services/proyection.service';
import { CommonModule } from '@angular/common';
import { CombatComponent } from '../combat/combat.component';

@Component({
  selector: 'app-proyection',
  imports: [CommonModule, CombatComponent],
  templateUrl: './proyection.component.html',
  styleUrl: './proyection.component.scss',
})
export class ProyectionComponent {

  proyection = inject(ProyectionService);

}
