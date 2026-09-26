import { Component } from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
  
} from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',

  imports: [
    FormsModule,
    
  ],

  templateUrl: './signup.html',

  styleUrl: './signup.css'
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

    console.log('SIGNUP BUTTON WORKED');


    // Check that all fields are filled
    if (
      !this.email.trim() ||
      !this.password
    ) {

      this.errorMessage =
        'Please enter your email and password.';

      return;

    }


    // Check minimum Firebase password length
    if (
      this.password.length < 6
    ) {

      this.errorMessage =
        'Password must be at least 6 characters.';

      return;

    }


    try {

      console.log(
        'Creating Firebase account...'
      );


      // Create Firebase account
      await this.authService.register(
        this.email.trim(),
        this.password
      );


      console.log(
        'Firebase account created successfully.'
      );


      // Send user to dashboard
      await this.router.navigate([
        '/dashboard'
      ]);

    }


    catch (error: any) {

      console.error(
        'FULL SIGNUP ERROR:',
        error
      );


      if (
        error?.code ===
        'auth/email-already-in-use'
      ) {

        this.errorMessage =
          'An account with this email already exists.';

      }


      else if (
        error?.code ===
        'auth/invalid-email'
      ) {

        this.errorMessage =
          'Please enter a valid email address.';

      }


      else if (
        error?.code ===
        'auth/weak-password'
      ) {

        this.errorMessage =
          'Password is too weak. Please use a stronger password.';

      }


      else if (
        error?.code ===
        'auth/operation-not-allowed'
      ) {

        this.errorMessage =
          'Email/password sign-up is not enabled in Firebase.';

      }


      else if (
        error?.code ===
        'auth/network-request-failed'
      ) {

        this.errorMessage =
          'Network error. Please check your internet connection and try again.';

      }


      else {

        this.errorMessage =
          `${error?.code || 'Signup error'}: ${
            error?.message ||
            'Unable to create your account.'
          }`;

      }

    }

  }

}