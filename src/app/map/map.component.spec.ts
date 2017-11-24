import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioNode } from '../models/audio-node'; 
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { MaterialModule } from '../material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [
        MaterialModule,
        AgmCoreModule.forRoot({})
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const mobileNode: AudioNode = new AudioNode();
    const fixNode: AudioNode = new AudioNode();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;

    component.mobileNodes = new Array<AudioNode>();
    component.fixNode = new AudioNode();

    fixNode.isFix = true;

    component.mobileNodes.push(mobileNode);
    component.fixNode = fixNode;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an agm-map', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('agm-map')).toBeTruthy();
  });
});
