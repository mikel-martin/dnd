import {Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {AuthService} from '../../../services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  private auth = inject(AuthService);

  get initials() {
    if (!this.auth.user()?.displayName) return '';

    const words = (this.auth.user()?.displayName ?? '')
      .trim()
      .split(' ')
      .filter(w => w.length > 0);
    const initials = words.map(w => w[0].toUpperCase());

    return initials.slice(0, 2).join('');
  }
}
