import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { switchMap } from 'rxjs';
import { Hero, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero-page.component.html',
})
export class NewHeroPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroService:HeroesService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
  ){}

  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if(!this.router.url.includes("edit")) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroService.getHeroById(id)),
      ).subscribe(hero => {

        if ( !hero ) {
          return this.router.navigateByUrl('/');
        }
      this.heroForm.reset( hero );
      return;
    });
  }

  onSubmit(): void{
    if (this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar(`${hero.superhero} updated!`)
        });
    return
    }

    this.heroService.addHero(this.currentHero)
      .subscribe(hero => {
        //TODO: show snackbar, nav to /heroes/edit/hero.id
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSnackbar(`${hero.superhero} created!`)
      });

  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, "close", {duration: 2500})
  }
}
