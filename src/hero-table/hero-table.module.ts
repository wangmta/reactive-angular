import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { HeroTableComponent } from './hero-table.component';
import { ComponentModule } from '../components/component.module';

const routes: Route[] = [
  {
    path: '',
    component: HeroTableComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ComponentModule],
  declarations: [HeroTableComponent]
})
export class HeroTableModule {}
