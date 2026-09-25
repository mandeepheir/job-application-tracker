import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html'
})
export class Signup {

  email = '';

  password = '';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async signup() {

    this.errorMessage = '';

    if (!this.email || !this.password) {

      this.errorMessage =
        'Please enter an email and password.';

      return;

    }

    try {

      await this.authService.register(
        this.email,
        this.password
      );

      await this.router.navigate([
        '/'
      ]);

    } catch (error: any) {

      console.error(
        'Signup error:',
        error
      );

      this.errorMessage =
        'Could not create account. Please check your email and password.';

    }

  }

}