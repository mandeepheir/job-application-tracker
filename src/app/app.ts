
import { Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router
} from '@angular/router';

import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private readonly settingsKey = 'jobtrack-settings';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.applyCompactMode();
  }

  private applyCompactMode() {
    const savedSettings =
      localStorage.getItem(this.settingsKey);

    if (!savedSettings) {
      return;
    }

    try {
      const settings = JSON.parse(savedSettings);

      document.body.classList.toggle(
        'compact-mode',
        settings.compactMode === true
      );

    } catch (error) {

      console.error(
        'Error loading compact mode:',
        error
      );

    }
  }

  async logout() {

    try {

      await this.authService.logout();

      await this.router.navigate([
        '/login'
      ]);

    } catch (error) {

      console.error(
        'Logout error:',
        error
      );

    }

  }

}

