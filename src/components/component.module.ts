import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroImageComponent } from './hero-image/hero-image.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HeroImageComponent],
  exports: [HeroImageComponent]
})
export class ComponentModule {}
