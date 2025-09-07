import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-prompt-modal',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
  ],
  styleUrl: './prompt-modal.component.scss',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      @if (data.description) {
        <p>{{ data.description }}</p>
      }
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>{{ data.label }}</mat-label>
        @if (type !== 'select') {
          <input
            matInput
            [type]="type"
            [(ngModel)]="value"
            (keydown.enter)="confirm()" />
        } @else {
          <mat-select [(ngModel)]="value">
            @for (option of options; track option.value) {
              <mat-option [value]="option.value">{{ option.label }}</mat-option>
            }
          </mat-select>
        }
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="cancel()">Cancelar</button>
      @if (type === 'select') {
        <button
          mat-flat-button
          [disabled]="value?.length === 0"
          (click)="confirm()">
          Aceptar
        </button>
      } @else {
        <button
          mat-flat-button
          color="primary"
          [disabled]="!value?.trim()"
          (click)="confirm()">
          Aceptar
        </button>
      }
    </mat-dialog-actions>
  `,
})
export class PromptModalComponent {
  private dialogRef = inject(MatDialogRef<PromptModalComponent>);

  data = inject(MAT_DIALOG_DATA);

  value?: any;

  type: 'number' | 'text' | 'select' = this.data.type ?? 'text';

  options: any[] = this.data.options ?? [];

  cancel() {
    this.dialogRef.close(null);
  }

  confirm() {
    if (this.type === 'select') {
      this.dialogRef.close(this.value ?? []);
    } else {
      const value = this.value?.trim();
      if (value) {
        this.dialogRef.close(value);
      }
    }
  }
}
