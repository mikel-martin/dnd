import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-d20',
  imports: [CommonModule],
  templateUrl: './d20.component.html',
  styleUrl: './d20.component.scss'
})
export class D20Component {

  value = input<number>();

  active = input<boolean>(true);

  clickable = input<boolean>(false);

  @Output("initiative") initiativeEvent = new EventEmitter<number>();

  setInitiative(event: Event) {

    if (this.clickable()) {

      event.preventDefault();
      event.stopPropagation();

      const initiative = parseInt(prompt("Enter initiative") || "");

      if (initiative && !isNaN(initiative)) {
        this.initiativeEvent.emit(initiative);
      }

    }

  }

}
