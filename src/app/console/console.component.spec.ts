import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabChangeEvent, MatSliderChange, MatCheckboxChange } from '@angular/material';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { AudioNode } from '../models/audio-node';
import { ConsoleComponent } from './console.component';
import { ConsoleSliderComponent } from '../console-slider/console-slider.component';
import { AudioNodeService } from '../services/audio-node.service';
import 'rxjs/add/operator/map';
import 'hammerjs';

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
      ],
      providers: [
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        Http,
        AudioNodeService,
        ObservableMedia
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleComponent);
    component = fixture.componentInstance;
    component.audioNodes = new Array<AudioNode>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    beforeEach(() => {
      const mobileNode: AudioNode = new AudioNode();
      const fixNode: AudioNode = new AudioNode();
      fixNode.isFix = true;
      component.audioNodes.push(mobileNode, fixNode);
      component.initializeAudioNodes();
    });

    it('should initialize a list of mobile nodes', () => {
      fixture.whenStable().then(() => {
        expect(component.mobileNodes).toBeTruthy();
        expect(component.mobileNodes.length).toBeTruthy();
      });
    });

    it('should initialize the fix node', () => {
      fixture.whenStable().then(() => {
        expect(component.fixNode).toBeTruthy();
      });
    });
  });

  describe('onMarkerClicked', () => {
    it('should change the selectedTabIndex', () => {
      component.onMarkerClicked(1);
      expect(component.selectedTabIndex).toEqual(1);
    });
  });

  describe('onSelectedTabChanged', () => {
    it('should change the selectedTabIndex', () => {
      const tabChangeEvent: MatTabChangeEvent = new MatTabChangeEvent();
      tabChangeEvent.index = 1;
      component.onSelectedTabChanged(tabChangeEvent);
      expect(component.selectedTabIndex).toEqual(1);
    });
  });

  describe('onSliderChange', () => {
    it('should call the audioNodeService notifyChange with the correct arguments', () => {
      const audioNodeServiceStub: AudioNodeService = fixture.debugElement.injector.get(AudioNodeService);
      spyOn(audioNodeServiceStub, 'notifyChange').and.callThrough();
      const matSliderChange: MatSliderChange = new MatSliderChange();
      component.fixNode = new AudioNode();
      matSliderChange.value = 69;

      component.onSliderChange(component.fixNode, 'volume', matSliderChange);
      expect(audioNodeServiceStub.notifyChange).toHaveBeenCalledWith(component.fixNode.id, 0, matSliderChange.value);
    });
  });

  describe('onAutoAdjustChange', () => {
    it('should call the audioNodeService notifyAutoAdjustChange with the correct arguments', () => {
      const audioNodeServiceStub: AudioNodeService = fixture.debugElement.injector.get(AudioNodeService);
      spyOn(audioNodeServiceStub, 'notifyAutoAdjustChange').and.callThrough();
      const matCheckboxChange: MatCheckboxChange = new MatCheckboxChange();
      matCheckboxChange.checked = true;
      component.mobileNodes.push(new AudioNode());

      component.onAutoAdjustChange(component.mobileNodes[0], matCheckboxChange);
      expect(audioNodeServiceStub.notifyAutoAdjustChange).toHaveBeenCalledWith(component.mobileNodes[0].id, matCheckboxChange.checked);
    });
  });

  describe('makeCardsResponsive', () => {
    describe('for an XL device', () => {
      it ('should return correct number of columns for the layout', () => {
        const observableMediaStub: ObservableMedia = fixture.debugElement.injector.get(ObservableMedia);

        spyOn(observableMediaStub, 'subscribe').and.callThrough();
        spyOn(observableMediaStub, 'asObservable').and.returnValue({map: () => {
          const mediaChange: MediaChange = new MediaChange();
          mediaChange.mqAlias = 'xl';
          return Observable.of(component.XL_NUMBER_OF_COLUMNS);
        }});
        spyOn(observableMediaStub, 'isActive').and.returnValue(() => {
          return true;
        });

        component.makeCardsResponsive();

        expect(observableMediaStub.asObservable).toHaveBeenCalled();
        expect(observableMediaStub.isActive).toHaveBeenCalledWith('xs');
        expect(observableMediaStub.isActive).toHaveBeenCalledWith('sm');
        expect(observableMediaStub.isActive).toHaveBeenCalledWith('md');
        expect(observableMediaStub.isActive).toHaveBeenCalledWith('lg');
        expect(observableMediaStub.isActive).toHaveBeenCalledWith('xl');
        component.cols.subscribe(colsValue => {
          expect(colsValue).toEqual(component.XL_NUMBER_OF_COLUMNS);
        });
      });
    });
  });

  describe('The DOM', () => {
    beforeEach(() => {
      const mobileNode: AudioNode = new AudioNode();
      const fixNode: AudioNode = new AudioNode();

      fixNode.isFix = true;
      component.audioNodes.push(mobileNode, fixNode);
      component.initializeAudioNodes();
      component.cols = Observable.of(3);

      fixture.detectChanges();
    });

    it('should contain all slider', () => {
      const compiled = fixture.debugElement.nativeElement;
      const TOTAL_NUMBER_OF_SLIDERS: number = 8;

      expect(compiled.querySelectorAll('app-console-slider').length).toEqual(TOTAL_NUMBER_OF_SLIDERS);
    });

    it('should contain all tabs', () => {
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('.mat-tab-label').length).toEqual(component.mobileNodes.length);
    });

    it('should contain a card for the fix node', () => {
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelector('#fix-card')).toBeTruthy();
    });

    it('should contain a card for the mobile node', () => {
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelector('#mobile-card')).toBeTruthy();
    });

    it('should contain all progress bars', () => {
      const compiled = fixture.debugElement.nativeElement;
      const TOTAL_NUMBER_OF_PROGRESS_BARS: number = 8;

      expect(compiled.querySelectorAll('mat-progress-bar').length).toEqual(TOTAL_NUMBER_OF_PROGRESS_BARS);
    });

    it('should contain the auto adjust checkbox', () => {
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelector('.automatic-adjustment')).toBeTruthy();
    });
  });
});
