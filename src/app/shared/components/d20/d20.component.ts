import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-d20',
  imports: [CommonModule],
  templateUrl: './d20.component.html',
  styleUrl: './d20.component.scss'
})
export class D20Component {

  value = input<number>(20);

  active = input<boolean>(true);

}
