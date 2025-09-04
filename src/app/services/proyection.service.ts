import { Injectable, signal } from '@angular/core';
import { Subject, type Observable } from 'rxjs';
import { ProyectionEventType } from '../enums/proyection-event-type.interface';

const SHOWING_COMVAT_MENU_KEY = "combat.showing";

@Injectable({
  providedIn: 'root'
})
export class ProyectionService {

  public backgroundImage = signal('');

  public showingCombatMenu = signal(false);

  private channel = new BroadcastChannel('proyection');

  private event$ = new Subject<any>();

  constructor() {

    this.showingCombatMenu.set(localStorage.getItem(SHOWING_COMVAT_MENU_KEY) ? true : false);

    this.channel.onmessage = (message) => {
      this.event$.next(message.data);
    };

    this._on().subscribe((event: any) => {
      if (event.type === ProyectionEventType.IMAGE) {
        this._handleImageEvent(event.data);
      } else if (event.type === ProyectionEventType.COMBAT_VISIBILITY) {
        this._handleCombatMenuVisibility(event.data);
      }
    });

  }

  ngOnDestroy(): void {
    this.channel.close();
  }

  emit(event: any): void {
    this.channel.postMessage(event);
  }

  private _on(): Observable<any> {
    return this.event$.asObservable();
  }

  private _handleImageEvent(data: any): void {
    this.backgroundImage.set(data);
  }

  private _handleCombatMenuVisibility(data: any): void {
    this.showingCombatMenu.set(data);
    if (data) {
      localStorage.setItem(SHOWING_COMVAT_MENU_KEY, "true");
    } else {
      localStorage.removeItem(SHOWING_COMVAT_MENU_KEY);
    }
  }

}
