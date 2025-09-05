import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-prompt-modal',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
  ],
  styleUrl: './prompt-modal.component.scss',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <mat-form-field class="w-full">
        <mat-label>{{ data.label }}</mat-label>
        <input matInput [type]="type" [(ngModel)]="value" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancelar</button>
      <button mat-button color="primary" (click)="confirm()">Aceptar</button>
    </mat-dialog-actions>
  `,
})
export class PromptModalComponent {
  private dialogRef = inject(MatDialogRef<PromptModalComponent>);

  data = inject(MAT_DIALOG_DATA);

  value = '';

  type: string = this.data.type ?? 'text';

  cancel() {
    this.dialogRef.close(null);
  }

  confirm() {
    this.dialogRef.close(this.value);
  }
}
