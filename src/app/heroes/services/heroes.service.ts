import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/heroe.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http:HttpClient) { }

  getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroById(id: string): Observable<Hero|undefined>{
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${id}`)
      .pipe(
        catchError( error => of(undefined))
      );
  }

  getSuggestions(query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }

  addHero(hero: Hero):Observable<Hero>{
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero );
  }

  updateHero(toUpdateHero: Hero):Observable<Hero>{
    if (!toUpdateHero.id) throw new Error("Hero id is required")
    return this.http.post<Hero>(`${ this.baseUrl }/heroes/${toUpdateHero.id}`, toUpdateHero );
  }

  deleteHeroById(id: string): Observable<boolean>{

    return this.http.delete<Hero>(`${ this.baseUrl }/heroes/${ id }` )
      .pipe(
        catchError(err => of(false)), //couldn't delete
        map( resp => true)
      );
  }
}
