import { Component } from '@angular/core';

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
}
