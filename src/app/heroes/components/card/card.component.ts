import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroe.interface';

@Component({
  selector: 'heroes-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {

  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if(!this.hero) throw new Error('Hero property is required');
  }

}
