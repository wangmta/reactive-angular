import { Component } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.css']
})
export class HeroTableComponent {
  constructor(private heroService: HeroService) {}

  heroes$;
  // heroes$ = this.heroService.heroes$;
  search$ = this.heroService.search$;
  page$ = this.heroService.page$;
  // userPage = this.page$.pipe(map(page => page + 1)); // this is not a good solution since it double subscribes
  // the one used in template is better
  limit$ = this.heroService.limit$;
  limits = this.heroService.limits;
  totalResults$ = this.heroService.totalResults$;
  totalPages$ = this.heroService.totalPages$;
  isFirstPage$ = this.page$.pipe(map(page => page === 0));
  isLastPage$ = combineLatest(this.page$, this.totalPages$).pipe(
    map(([page, totalPages]) => page === totalPages - 1)
  );

  // bind with view
  // [ngModel]="search$ | async" (ngModalChange)="doSearch($event)"
  doSearch(term) {
    this.heroService.setSearch(term);
  }

  doLimit(limit) {
    this.heroService.setLimit(limit);
  }

  setPage(num) {
    this.heroService.setPageBy(num);
  }

  loadData() {
    this.heroes$ = this.heroService.heroes$;
  }
}
