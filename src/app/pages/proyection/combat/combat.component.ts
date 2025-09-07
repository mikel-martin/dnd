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
import {CombatService} from '../../../services/combat.service';
import {CharacterItemComponent} from '../../../shared/components/character-item/character-item.component';

@Component({
  selector: 'app-combat',
  imports: [CharacterItemComponent, MatButtonModule, MatIconModule],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.scss',
})
export class CombatComponent {
  combat = inject(CombatService);

  proyection = inject(ProyectionService);

  @ViewChildren('character', {read: ElementRef})
  characterEls!: QueryList<ElementRef>;

  private _scrollToSelected() {
    const index = this.combat.activeCharacterIndex;
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
