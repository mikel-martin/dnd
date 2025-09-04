import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProyectionService } from '../../services/proyection.service';
import { ProyectionEventType } from '../../enums/proyection-event-type.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileInputComponent } from '../../shared/components/file-input/file-input.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    FileInputComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private proyection = inject(ProyectionService);

  showingCombatMenu = false;

  ngOnInit() {
    this.showingCombatMenu = this.proyection.showingCombatMenu();
  }

  clearBackgroundImage() {
    this.proyection.emit({ type: ProyectionEventType.IMAGE, data: null });
  }

  combatToggleChange(event: any) {
    this.showingCombatMenu = event.checked;
    this.proyection.emit({ type: ProyectionEventType.COMBAT_VISIBILITY, data: event.checked });
  }

  async emit(event: Event) {

    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const base64 = await this.toBase64(file);

    this.proyection.emit({ type: ProyectionEventType.IMAGE, data: base64 });

  }

  private toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

}
