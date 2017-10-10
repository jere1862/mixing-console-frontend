import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleLevelComponent } from './console-level.component';

describe('ConsoleLevelComponent', () => {
  let component: ConsoleLevelComponent;
  let fixture: ComponentFixture<ConsoleLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoleLevelComponent ]
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
