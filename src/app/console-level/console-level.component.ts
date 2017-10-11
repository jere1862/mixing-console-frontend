import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ConsoleSliderComponent } from '../console-slider/console-slider.component';

@Component({
  selector: 'app-console-level',
  templateUrl: './console-level.component.html',
  styleUrls: ['./console-level.component.css']
})
export class ConsoleLevelComponent extends ConsoleSliderComponent {
  ngOnInit(): void {
  }
}
