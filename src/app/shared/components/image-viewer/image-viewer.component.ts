import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  type ElementRef,
  AfterViewInit,
} from '@angular/core';
import type {ImageEvent} from './image-event.interface';

@Component({
  selector: 'app-image-viewer',
  imports: [],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss',
})
export class ImageViewerComponent implements AfterViewInit {
  @Input() src = '';

  @Output() viewChange = new EventEmitter<ImageEvent>();

  @ViewChild('viewport', {static: true}) viewport!: ElementRef<HTMLDivElement>;
  @ViewChild('image', {static: true}) image!: ElementRef<HTMLImageElement>;

  scale = 1;
  minScale = 0.2;
  maxScale = 5;

  translateX = 0;
  translateY = 0;

  private dragging = false;
  private lastX = 0;
  private lastY = 0;

  ngAfterViewInit() {
    if (!this.image) return;

    this.image.nativeElement.onload = () => {
      this._setInitialFitWidth();
    };

    // Si la imagen ya está cargada (cache), llamar manualmente
    if (this.image.nativeElement.complete) {
      this._setInitialFitWidth();
    }
  }

  private _emitState(event?: MouseEvent) {
    const rect = this.image.nativeElement.getBoundingClientRect();
    const viewportRect = this.viewport.nativeElement.getBoundingClientRect();

    const mouseX = event ? event.clientX - rect.left : null;
    const mouseY = event ? event.clientY - rect.top : null;

    this.viewChange.emit({
      mouseX: mouseX ?? 0,
      mouseY: mouseY ?? 0,
      scale: this.scale,
      translateX: this.translateX,
      translateY: this.translateY,
      viewportWidth: viewportRect.width,
      viewportHeight: viewportRect.height,
    });
  }

  private _setInitialFitWidth() {
    if (!this.image || !this.viewport) return;

    const viewportRect = this.viewport.nativeElement.getBoundingClientRect();
    const img = this.image.nativeElement;

    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    // Escalar al ancho máximo del viewport
    this.scale = viewportRect.width / naturalWidth;

    // Centrar verticalmente
    const scaledHeight = naturalHeight * this.scale;
    this.translateX = 0;
    this.translateY = (viewportRect.height - scaledHeight) / 2;

    // Emitir estado inicial
    this._emitState();
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();

    const rect = this.image.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const oldScale = this.scale;
    const delta = event.deltaY < 0 ? 1.1 : 0.9;
    let newScale = oldScale * delta;

    newScale = Math.min(this.maxScale, Math.max(this.minScale, newScale));
    const scaleRatio = newScale / oldScale;

    this.translateX = mouseX - scaleRatio * (mouseX - this.translateX);
    this.translateY = mouseY - scaleRatio * (mouseY - this.translateY);

    this.scale = newScale;

    this._emitState(event);
  }

  onMouseDown(event: MouseEvent) {
    this.dragging = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    this._emitState(event);
  }

  onMouseMove(event: MouseEvent) {
    if (!this.dragging) return;

    const dx = event.clientX - this.lastX;
    const dy = event.clientY - this.lastY;

    this.translateX += dx;
    this.translateY += dy;

    this.lastX = event.clientX;
    this.lastY = event.clientY;

    this._emitState(event);
  }

  onMouseUp() {
    this.dragging = false;
  }
}
