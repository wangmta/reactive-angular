import { Component, Input, OnInit } from '@angular/core';

export const Layouts = {
  portrait: 'portrait',
  standard: 'standard',
  landscape: 'landscape'
};

export const Sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge'
};

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.css']
})
export class HeroImageComponent implements OnInit {
  @Input() path;
  @Input() extension = 'jpg';
  @Input() size = Sizes.small;
  @Input() layout = Layouts.standard;

  loaded = false;

  constructor() {}

  ngOnInit() {}
}
