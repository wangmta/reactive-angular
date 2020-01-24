import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeroTableComponent } from './hero-table/hero-table.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentModule } from './components/component.module';

const routes: Route[] = [
  // {
  //   path: '',
  //   component: HeroTableComponent
  // }
  // lazy loading
  {
    path: '',
    loadChildren: './hero-table/hero-table.module#HeroTableModule'
  }
];

@NgModule({
  declarations: [
    AppComponent
    // HeroTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
