import { ProyectionService } from './../../services/proyection.service';
import {
  Component,
  ElementRef,
  inject,
  ViewChildren,
  type QueryList,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CombatService } from '../../services/combat.service';
import { CharacterCombatProyectionItemComponent } from './character-proyection-item/character-proyection-item.component';

@Component({
  selector: 'app-combat',
  imports: [
    CharacterCombatProyectionItemComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.scss',
})
export class CombatComponent {
  combat = inject(CombatService);

  proyection = inject(ProyectionService);

  @ViewChildren('character', { read: ElementRef })
  characterEls!: QueryList<ElementRef>;

  next() {
    this.combat.next();
    this._scrollToSelected();
  }

  previous() {
    this.combat.previous();
  }

  private _scrollToSelected() {
    const index = this.combat.activeCharacter;
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
