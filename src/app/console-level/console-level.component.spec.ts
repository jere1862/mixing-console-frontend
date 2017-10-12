import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleLevelComponent } from './console-level.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'hammerjs';


describe('ConsoleLevelComponent', () => {
  let component: ConsoleLevelComponent;
  let fixture: ComponentFixture<ConsoleLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoleLevelComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
