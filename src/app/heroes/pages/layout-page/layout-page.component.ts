import { Component } from '@angular/core';
import { AuthenticationService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
})
export class LayoutPageComponent {
  public sidebarItems = [
    {label: "List", icon: "label", url: "./list"},
    {label: "Add", icon: "add", url: "./new-hero"},
    {label: "Search", icon: "search", url: "./search"},
  ]


  constructor(
    private authService:AuthenticationService,
    private router:Router,
  ){}

  get user(): User | undefined{
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logOut()
    this.router.navigate(["auth/login"])
  }
}
