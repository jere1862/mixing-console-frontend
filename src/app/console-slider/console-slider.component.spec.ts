import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleSliderComponent } from './console-slider.component';

describe('ConsoleSliderComponent', () => {
  let component: ConsoleSliderComponent;
  let fixture: ComponentFixture<ConsoleSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoleSliderComponent ]
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
});
