import {inject, Injectable, Injector, signal, OnDestroy} from '@angular/core';
import {Subject, type Observable} from 'rxjs';
import {ProyectionEventType} from '../enums/proyection-event-type.interface';
import {EncounterService} from './encounter.service';

const SHOWING_COMVAT_MENU_KEY = 'encounter.showing';

@Injectable({
  providedIn: 'root',
})
export class ProyectionService implements OnDestroy {
  public backgroundImage = signal<string | undefined | null>('');

  public timer = signal<{
    seconds: number;
    milliseconds: number;
  }>({
    seconds: 60,
    milliseconds: 0,
  });

  public showingEncounterMenu = signal(false);

  private channel = new BroadcastChannel('proyection');

  private injector = inject(Injector);

  event$ = new Subject<any>();

  constructor() {
    this.showingEncounterMenu.set(
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
      this._handleEncounterEvent(event.data);
    } else if (event.type === ProyectionEventType.COMBAT_VISIBILITY) {
      this._handleEncounterMenuVisibility(event.data);
    } else if (event.type === ProyectionEventType.COMBAT_ACTIVE_CHARACTER) {
      this._handleActiveCharacterEvent(event.data);
    } else if (event.type === ProyectionEventType.TIMER) {
      this._handleTimerEvent(event.data);
    }
  }

  private _on(): Observable<any> {
    return this.event$.asObservable();
  }

  private _handleImageEvent(data: any): void {
    this.backgroundImage.set(data);
  }

  private _handleTimerEvent(data: any): void {
    this.timer.set(data);
  }

  private _handleEncounterEvent(data: any): void {
    const encounter = this.injector.get<EncounterService>(EncounterService);
    encounter.characters.set(data);
  }

  private _handleActiveCharacterEvent(data: any): void {
    const encounter = this.injector.get<EncounterService>(EncounterService);
    encounter.activeCharacter = data;
  }

  private _handleEncounterMenuVisibility(data: any): void {
    this.showingEncounterMenu.set(data);
    if (data) {
      localStorage.setItem(SHOWING_COMVAT_MENU_KEY, 'true');
    } else {
      localStorage.removeItem(SHOWING_COMVAT_MENU_KEY);
    }
  }
}
