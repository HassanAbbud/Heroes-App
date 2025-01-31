import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { routes } from '../../../auth/auth-routing.module';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {

  public searchInput = new FormControl("");
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroesService:HeroesService){}

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions( value )
      .subscribe( heroes => this.heroes = heroes );
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent) {
    if(!event.option.value){
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }
}
