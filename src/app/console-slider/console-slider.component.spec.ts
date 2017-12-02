import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MatSliderChange } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'hammerjs';

import { ConsoleSliderComponent } from './console-slider.component';

describe('ConsoleSliderComponent', () => {
  let component: ConsoleSliderComponent;
  let fixture: ComponentFixture<ConsoleSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsoleSliderComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        TranslateModule.forRoot()
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSliderChange', () => {
    it('should emit sliderChange event', () => {
      const matSliderChange: MatSliderChange = new MatSliderChange();
      matSliderChange.value = 69;

      component.sliderChange.subscribe(change => {
        expect(change).toEqual(matSliderChange);
      });

      component.onSliderChange(matSliderChange);
    });
  });
});
