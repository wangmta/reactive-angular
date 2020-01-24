import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
const HERO_API = 'https://gateway.marvel.com:443';
const LIMIT_LOW = 10;
const LIMIT_MID = 25;
const LIMIT_HIGH = 100;
const LIMITS = [LIMIT_LOW, LIMIT_MID, LIMIT_HIGH];

@Injectable({ providedIn: 'root' })
export class HeroService {
  limits = LIMITS;

  // BehavoirSubject takes in an inital/default value
  search$ = new BehaviorSubject('');
  limit$ = new BehaviorSubject(LIMIT_LOW);
  page$ = new BehaviorSubject(0);
  totalResults$ = new BehaviorSubject(0);
  totalPages$ = combineLatest(this.limit$, this.totalResults$).pipe(
    map(([limit, totalResults]) => Math.ceil(totalResults / limit))
  );

  combined$ = combineLatest(this.search$, this.limit$, this.page$);

  heroes$ = this.combined$.pipe(
    switchMap(([search, limit, page]) => {
      const params: any = {
        apikey: environment.MARVEL_API.PUBLIC_KEY,
        limit: limit,
        offset: page * limit
      };

      if (search) {
        params.nameStartsWith = search;
      }

      return this.http.get(`${HERO_API}/v1/public/characters`, { params });
    }),
    tap((res: any) => this.totalResults$.next(res.data.total)),
    map((res: any) => res.data.results)
  );

  constructor(private http: HttpClient) {}

  setSearch(term) {
    this.search$.next(term);
  }

  setLimit(limit) {
    this.limit$.next(limit);
    // reset page to 0 when user reset limit
    this.page$.next(0);
  }

  setPageBy(num: number) {
    // getValue() is BehavoirSubject's method
    const currentPage = this.page$.getValue();
    this.page$.next(currentPage + num);
  }
}
