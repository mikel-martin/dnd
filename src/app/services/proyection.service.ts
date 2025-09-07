import {inject, Injectable, Injector, signal, OnDestroy} from '@angular/core';
import {Subject, type Observable} from 'rxjs';
import {ProyectionEventType} from '../enums/proyection-event-type.interface';
import {CombatService} from './combat.service';

const SHOWING_COMVAT_MENU_KEY = 'combat.showing';

@Injectable({
  providedIn: 'root',
})
export class ProyectionService implements OnDestroy {
  public backgroundImage = signal<string | undefined | null>('');

  public showingCombatMenu = signal(false);

  private channel = new BroadcastChannel('proyection');

  private injector = inject(Injector);

  event$ = new Subject<any>();

  constructor() {
    this.showingCombatMenu.set(
      localStorage.getItem(SHOWING_COMVAT_MENU_KEY) ? true : false
    );

    this.channel.onmessage = message => {
      this.event$.next(message.data);
    };

    this._on().subscribe((event: any) => this._handleEvent(event));
  }

  ngOnDestroy(): void {
    this.channel.close();
  }

  emit(event: any): void {
    this.channel.postMessage(event);
    this._handleEvent(event);
  }

  private _handleEvent(event: any) {
    if (event.type === ProyectionEventType.IMAGE) {
      this._handleImageEvent(event.data);
    } else if (event.type === ProyectionEventType.COMBAT_UPDATE) {
      this._handleCombatEvent(event.data);
    } else if (event.type === ProyectionEventType.COMBAT_VISIBILITY) {
      this._handleCombatMenuVisibility(event.data);
    }
  }

  private _on(): Observable<any> {
    return this.event$.asObservable();
  }

  private _handleImageEvent(data: any): void {
    this.backgroundImage.set(data);
  }

  private _handleCombatEvent(data: any): void {
    const combat = this.injector.get<CombatService>(CombatService);
    combat.characters.set(data);
  }

  private _handleCombatMenuVisibility(data: any): void {
    this.showingCombatMenu.set(data);
    if (data) {
      localStorage.setItem(SHOWING_COMVAT_MENU_KEY, 'true');
    } else {
      localStorage.removeItem(SHOWING_COMVAT_MENU_KEY);
    }
  }
}
