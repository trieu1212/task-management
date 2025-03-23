import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FirebaseService } from '../services/auth/firebase.service';

export const guestGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const firebaseService = inject(FirebaseService)
  const router = inject(Router)

  return firebaseService.getCurrentUser().pipe(
    map(user => {
      if (user) {
        return router.createUrlTree(['/home'])
      } else {
        return true
      }
    })
  )
};
