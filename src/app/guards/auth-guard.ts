import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { take } from 'rxjs';

export const authGuard: CanActivateFn = () => {

  const auth = inject(Auth);
  const router = inject(Router);

  const currentUser = auth.currentUser;

  if (currentUser) {
    return true;
  }

  router.navigate(['/login']);

  return false;
};