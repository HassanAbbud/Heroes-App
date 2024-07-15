import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, CanMatchFn, Route, UrlSegment } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';

function checkAuthStatus(): boolean | Observable<boolean> {
  const authService = inject(AuthenticationService);
    const router = inject(Router);

  return authService.checkAuthenticationStatus()
    .pipe(
      tap(isAuthenticated => {
        if(isAuthenticated) router.navigate(["./"]);
      }),
      map(isAuthenticated => !isAuthenticated)
    );
}

export const publicCanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {

    return checkAuthStatus();
}

export const publicCanMatchGuard: CanMatchFn = (
  route: Route,
  state: UrlSegment[]
  ) => {
    return checkAuthStatus();
}
