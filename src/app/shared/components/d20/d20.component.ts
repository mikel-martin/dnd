import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { PromptService } from '../../../services/prompt.service';

@Component({
  selector: 'app-d20',
  imports: [CommonModule],
  templateUrl: './d20.component.html',
  styleUrl: './d20.component.scss',
})
export class D20Component {
  private prompt = inject(PromptService);

  value = input<number>();

  active = input<boolean>(true);

  clickable = input<boolean>(false);

  @Output('initiative') initiativeEvent = new EventEmitter<number>();

  setInitiative(event: Event) {
    if (this.clickable()) {
      event.preventDefault();
      event.stopPropagation();

      this.prompt
        .open({
          title: 'Initiative',
          description: 'Type this characters rolled initiative',
          label: 'Initiative',
          type: 'number',
        })
        .subscribe((result) => {
          if (result !== null) {
            const initiative = parseInt(result);

            if (initiative && !isNaN(initiative)) {
              this.initiativeEvent.emit(initiative);
            }
          }
        });
    }
  }
}
