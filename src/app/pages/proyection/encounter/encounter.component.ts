import {ProyectionService} from '../../../services/proyection.service';
import {
  Component,
  ElementRef,
  inject,
  ViewChildren,
  type QueryList,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {EncounterService} from '../../../services/encounter.service';
import {CharacterItemComponent} from '../../../shared/components/character-item/character-item.component';

@Component({
  selector: 'app-encounter',
  imports: [CharacterItemComponent, MatButtonModule, MatIconModule],
  templateUrl: './encounter.component.html',
  styleUrl: './encounter.component.scss',
})
export class EcnounterComponent {
  encounter = inject(EncounterService);

  proyection = inject(ProyectionService);

  @ViewChildren('character', {read: ElementRef})
  characterEls!: QueryList<ElementRef>;

  private _scrollToSelected() {
    const index = this.encounter.activeCharacterIndex;
    const el = this.characterEls.get(index)?.nativeElement as HTMLElement;

    if (!el) return;

    const container = el.parentElement as HTMLElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const offsetTop = elRect.top - containerRect.top + container.scrollTop;

    const scrollTo =
      offsetTop - container.clientHeight / 2 + el.clientHeight / 2;

    container.scrollTo({
      top: scrollTo,
      behavior: 'smooth',
    });
  }
}
