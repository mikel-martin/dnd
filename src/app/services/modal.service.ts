import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {type Observable} from 'rxjs';
import {ConfirmationModalComponent} from '../shared/components/confirmation-modal/confirmation-modal.component';
import {ComponentType} from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dialog = inject(MatDialog);
  modal(
    component: ComponentType<any>,
    data?: any,
    options: any = {}
  ): Observable<string | null> {
    const dialogRef = this.dialog.open(component, {
      data: data,
      minWidth: '400px',
      ...options,
    });

    return dialogRef.afterClosed();
  }

  confirm(options: {
    title: string;
    description: string;
    acceptText?: string;
    cancelText?: string;
  }): Observable<string | null> {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: options,
      width: '400px',
    });

    return dialogRef.afterClosed();
  }
}
