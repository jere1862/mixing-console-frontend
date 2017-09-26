import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'hammerjs';

import { ConsoleComponent } from './console.component';
import { ConsoleSliderComponent } from '../console-slider/console-slider.component';

describe('ConsoleComponent', () => {
  let component: ConsoleComponent;
  let fixture: ComponentFixture<ConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConsoleComponent,
        ConsoleSliderComponent
      ],
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
    fixture = TestBed.createComponent(ConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it ('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it ('should initialize a list of mobile nodes', () => {
      fixture.whenStable().then(() => {
        expect(component.mobileNodes).toBeTruthy();
        expect(component.mobileNodes.length).toEqual(component.numberOfMobileNodes);
      });
    });

    it ('should initialize the fix node', () => {
      fixture.whenStable().then(() => {
        expect(component.fixNode).toBeTruthy();
      });
    });
  });

  describe('The DOM', () => {
    it ('should contain all slider', () => {
      const compiled = fixture.debugElement.nativeElement;
      const TOTAL_NUMBER_OF_SLIDERS: number = 8;
      let numberOfSliders: number = 0;

      compiled.querySelectorAll('app-console-slider').forEach( () => {
        numberOfSliders++;
      });

      expect(numberOfSliders).toEqual(TOTAL_NUMBER_OF_SLIDERS);
    });

    it ('should contain all tabs', () => {
      const compiled = fixture.debugElement.nativeElement;
      let numberOfTabs: number = 0;

      compiled.querySelectorAll('.mat-tab-label').forEach( () => {
        numberOfTabs++;
      });

      expect(numberOfTabs).toEqual(component.numberOfMobileNodes);
    });

    it ('should contain a card for the fix node', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#fix-card')).toBeTruthy();
    });

    it ('should contain a card for the mobile node', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#mobile-card')).toBeTruthy();
    });
  });
});
