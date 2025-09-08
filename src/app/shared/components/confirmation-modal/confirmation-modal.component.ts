import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import type {PromptModalComponent} from '../prompt-modal/prompt-modal.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-confirmation-modal',
  imports: [MatDialogModule, MatButtonModule],
  styleUrl: './confirmation-modal.component.scss',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      @if (data.description) {
        <p>{{ data.description }}</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="confirm(false)">
        {{ data.cancelText ?? 'Cancel' }}
      </button>
      <button mat-flat-button (click)="confirm(true)">
        {{ data.acceptText ?? 'Accept' }}
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmationModalComponent {
  private dialogRef = inject(MatDialogRef<PromptModalComponent>);

  data = inject(MAT_DIALOG_DATA);

  confirm(confirm: boolean) {
    this.dialogRef.close(confirm);
  }
}
