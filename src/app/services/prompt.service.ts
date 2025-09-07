import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {type Observable, map} from 'rxjs';
import {PromptModalComponent} from '../shared/components/prompt-modal/prompt-modal.component';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private dialog = inject(MatDialog);

  open(options: {
    title: string;
    description: string;
    label: string;
    type?: 'text' | 'number' | 'select';
    options?: any[];
  }): Observable<string | null> {
    const dialogRef = this.dialog.open(PromptModalComponent, {
      data: options,
      width: '400px',
    });

    return dialogRef
      .afterClosed()
      .pipe(map(result => (result !== undefined ? result : null)));
  }
}
