import { Component } from '@angular/core';
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
export class App {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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