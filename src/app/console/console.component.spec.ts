import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { AudioNode } from '../models/audio-node';
import { ConsoleComponent } from './console.component';
import { ConsoleSliderComponent } from '../console-slider/console-slider.component';
import { AudioNodeService } from '../services/audio-node.service';
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
  });
});
