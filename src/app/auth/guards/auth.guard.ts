import { CanMatchFn, CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

function checkAuthStatus(): boolean | Observable<boolean> {

  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.checkAuthenticationStatus()
    .pipe(
      tap(isAuthenticated => {
        if(!isAuthenticated) router.navigate(["./auth/login"]);
      })
    );
}

export const canActivateGuard: CanActivateFn = (route, state) => {
  console.log("Can Activate")
  console.log(route, state)
  return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = (route, segments) => {
  console.log("Can Match");
  console.log(route, segments);
  return checkAuthStatus();

};




