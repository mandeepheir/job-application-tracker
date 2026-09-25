import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {

  email = '';
  password = '';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {

    this.errorMessage = '';

    if (!this.email || !this.password) {

      this.errorMessage =
        'Please enter your email and password.';

      return;

    }

    try {

      await this.authService.login(
        this.email,
        this.password
      );

      await this.router.navigate([
        '/'
      ]);

    } catch (error: any) {

      console.error(
        'Login error:',
        error
      );

      this.errorMessage =
        'Invalid email or password.';

    }

  }

}