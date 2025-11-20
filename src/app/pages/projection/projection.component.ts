import {Component, inject, OnInit} from '@angular/core';
import {ProjectionService} from '../../services/projection.service';
import {CommonModule} from '@angular/common';
import {EcnounterComponent} from './encounter/encounter.component';
import {EncounterService} from '../../services/encounter.service';
import {ProjectionEventType} from '../../enums/projection-event-type.interface';

@Component({
  selector: 'app-projection',
  imports: [CommonModule, EcnounterComponent],
  templateUrl: './projection.component.html',
  styleUrl: './projection.component.scss',
})
export class ProjectionComponent implements OnInit {
  projection = inject(ProjectionService);

  encounter = inject(EncounterService);

  get projectedTransform() {
    const view = this.projection.imageView();
    if (!view) return '';

    const srcW = view.viewportWidth;
    const srcH = view.viewportHeight;

    const dstW = window.innerWidth;
    const dstH = window.innerHeight;

    const scaleX = dstW / srcW;
    const scaleY = dstH / srcH;

    // Escalado uniforme
    const screenScale = Math.min(scaleX, scaleY);

    // === NEW: calcular letterboxing ===
    const displayedW = srcW * screenScale;
    const displayedH = srcH * screenScale;

    const offsetX = (dstW - displayedW) / 2;
    const offsetY = (dstH - displayedH) / 2;

    // reescalar pan
    const translateX = view.translateX * screenScale + offsetX;
    const translateY = view.translateY * screenScale + offsetY;

    // reescalar zoom
    const newScale = view.scale * screenScale;

    return `translate(${translateX}px, ${translateY}px) scale(${newScale})`;
  }

  ngOnInit() {
    this.projection.event$.subscribe(event => {
      if (event.type === ProjectionEventType.IMAGE) {
        this.projection.backgroundImage.set(event.data);
      } else if (event.type === ProjectionEventType.IMAGE_VIEW_CHANGE) {
        this.projection.imageView.set(event.data);
      }
    });
  }
}
