import { Component } from '@angular/core';

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero-page.component.html',
})
export class NewHeroPageComponent {
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];
}
