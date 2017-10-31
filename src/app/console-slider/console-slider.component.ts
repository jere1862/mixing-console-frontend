import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { MdSliderChange } from '@angular/material';

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
  @Output()
  change: EventEmitter<MdSliderChange> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(mdSliderChange: MdSliderChange): void {
    this.change.emit(mdSliderChange);
  }

}
