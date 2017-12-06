import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter, SimpleChanges } from '@angular/core';
import { MatSliderChange } from '@angular/material';

export enum SliderType {
  volume = 0,
  low = 1,
  med = 2,
  high = 3
}

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

  @Input()
  disabled: boolean;

  @Output()
  sliderChange: EventEmitter<MatSliderChange> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSliderChange(matSliderChange: MatSliderChange): void {
    this.sliderChange.emit(matSliderChange);
  }
}
