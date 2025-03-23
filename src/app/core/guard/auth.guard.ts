import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { FirebaseService } from '../services/auth/firebase.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const firebaseService = inject(FirebaseService)
  const router = inject(Router)

  return firebaseService.getCurrentUser().pipe(
    map(user => {
      if (user) {
        return true
      } else {
        return router.createUrlTree(['/login'])
      }
    })
  )
};
