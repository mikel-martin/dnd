import {inject, Injectable, Injector, signal, OnDestroy} from '@angular/core';
import {Subject, type Observable} from 'rxjs';
import {ProjectionEventType} from '../enums/projection-event-type.interface';
import {EncounterService} from './encounter.service';
import type {ImageEvent} from '../shared/components/image-viewer/image-event.interface';

const SHOWING_COMVAT_MENU_KEY = 'encounter.showing';

@Injectable({
  providedIn: 'root',
})
export class ProjectionService implements OnDestroy {
  public backgroundImage = signal<string | undefined | null>('');

  public imageView = signal<ImageEvent | undefined>(undefined);

  public timer = signal<{
    seconds: number;
    milliseconds: number;
  }>({
    seconds: 60,
    milliseconds: 0,
  });

  public showingEncounterMenu = signal(false);

  private channel = new BroadcastChannel('projection');

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

  emit(event: {type: ProjectionEventType; data: any}): void {
    this.channel.postMessage(event);
    this._handleEvent(event);
  }

  private _handleEvent(event: any) {
    if (event.type === ProjectionEventType.IMAGE) {
      this._handleImageEvent(event.data);
    } else if (event.type === ProjectionEventType.IMAGE_VIEW_CHANGE) {
      this._handleImageViewChangeEvent(event.data);
    } else if (event.type === ProjectionEventType.COMBAT_UPDATE) {
      this._handleEncounterEvent(event.data);
    } else if (event.type === ProjectionEventType.COMBAT_VISIBILITY) {
      this._handleEncounterMenuVisibility(event.data);
    } else if (event.type === ProjectionEventType.COMBAT_ACTIVE_CHARACTER) {
      this._handleActiveCharacterEvent(event.data);
    } else if (event.type === ProjectionEventType.TIMER) {
      this._handleTimerEvent(event.data);
    }
  }

  private _on(): Observable<any> {
    return this.event$.asObservable();
  }

  private _handleImageEvent(data: any): void {
    this.backgroundImage.set(data);
  }

  private _handleImageViewChangeEvent(data: any): void {
    this.imageView.set(data);
    console.log(data);
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
