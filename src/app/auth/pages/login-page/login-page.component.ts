import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',

})
export class LoginPageComponent {

  constructor(
    private authService:AuthenticationService,
    private router: Router,
  ){}

  onLogin() {
    this.authService.logIn("someuser@hotmail.com", "userPassword")
      .subscribe(user => {
        this.router.navigate(['/'])
      });
  }

}
