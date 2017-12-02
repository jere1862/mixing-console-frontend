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
    component.mobileNodes.push(mobileNode);
    component.fixNode = fixNode;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should set the markers opacity when the selected index changes', () => {
      component.selectedMobileNodeIndex = 0;
      component.mobileNodes.forEach(mobileNode => {
        expect(mobileNode.markerOpacity).toEqual(component.defaultMarkerOpacity);
      });
    });
  });

  describe('emitSelectedMobileNodeIndex', () => {
    it('should emit onMarkerClicked event', () => {
      component.onMarkerClicked.subscribe(markerClicked => {
        expect(markerClicked).toEqual(component.selectedMobileNodeIndex);
      });

      component.emitSelectedMobileNodeIndex(1);
    });

    it('should set the correct marker opacity when called', () => {
      component.selectedMobileNodeIndex = 1;
      component.setMarkersOpacity();
      expect(component.mobileNodes[1].markerOpacity).toEqual(component.selectedMarkerOpacity);
    });
  });

  describe('The DOM', () => {
    it('should contain an agm-map', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('agm-map')).toBeTruthy();
    });
  });
});
