import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-console-slider',
  templateUrl: './console-slider.component.html',
  styleUrls: ['./console-slider.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class ConsoleSliderComponent implements OnInit {
  @Input()
  value: number;

  constructor() { }

  ngOnInit(): void {
  }

}
