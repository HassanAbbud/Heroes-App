import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',

})
export class ListPageComponent implements OnInit{


  public heroes: Hero[] = [];
  constructor(private heroService:HeroesService){}

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe( heroes => this.heroes = heroes );
  }
}
