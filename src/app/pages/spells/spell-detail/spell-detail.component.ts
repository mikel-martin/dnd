import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-spell-detail',
  imports: [MatDialogModule],
  templateUrl: './spell-detail.component.html',
  styleUrl: './spell-detail.component.scss',
})
export class SpellDetailComponent {
  spell = inject(MAT_DIALOG_DATA);
}
