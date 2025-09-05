import { DecimalPipe } from '@angular/common';
import { Component, computed, signal, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-combat-timer',
  imports: [MatButtonModule, MatIconModule, DecimalPipe],
  templateUrl: './combat-timer.component.html',
  styleUrl: './combat-timer.component.scss',
})
export class CombatTimerComponent implements OnDestroy {
  running = signal(false);

  private _intervalId: any;

  private _lastStart = 0;

  private _accumulated = 0;

  private _duration = 60_000;

  elapsed = signal(0);
  remaining = computed(() => Math.max(this._duration - this.elapsed(), 0));

  seconds = computed(() => Math.floor(this.remaining() / 1000));
  milliseconds = computed(() => Math.floor((this.remaining() % 1000) / 10));

  ngOnDestroy() {
    clearInterval(this._intervalId);
  }

  start() {
    if (this.running()) return;
    this._lastStart = Date.now();
    this._intervalId = setInterval(() => {
      this.elapsed.set(this._accumulated + (Date.now() - this._lastStart));
    }, 10);
    this.running.set(true);
  }

  pause() {
    if (!this.running()) return;
    clearInterval(this._intervalId);
    this._accumulated = this.elapsed();
    this.running.set(false);
  }

  reset() {
    clearInterval(this._intervalId);
    this._accumulated = 0;
    this.elapsed.set(0);
    this.running.set(false);
  }
}
