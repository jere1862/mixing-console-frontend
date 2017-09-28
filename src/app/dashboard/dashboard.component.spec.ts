import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MapComponent } from '../map/map.component';
import { AudioNodeService } from '../node/audio-node.service';
import { AudioNode } from '../models/audio-node';
import { Observable } from 'rxjs/Observable';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const INITIAL_CURRENT_LANG: string = 'fr';
const OTHER_LANGUAGE: string = 'en';
const mockNode: AudioNode = 
  {
    id: 1,
    name: "left mic",
    volume: 95,
    low: 12,
    med: 40,
    high: 50,
    latitude: 45.378008,
    longitude: -71.9269062,
    isFix: false
  };

@Pipe({name: 'translate'})
class MockPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

class TranslateServiceStub {
  currentLang: string = INITIAL_CURRENT_LANG;
  use: jasmine.Spy = jasmine.createSpy('use');
}

class AudioNodeServiceStub {
  getNodes = () => Observable.of([mockNode]);
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      declarations: [ DashboardComponent, MapComponent, MockPipe ],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceStub
        },
        {
          provide: AudioNodeService,
          useClass: AudioNodeServiceStub
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change language', () => {
    expect(component.language).toBe(INITIAL_CURRENT_LANG);
    component.changeLanguage();
    expect(component.language).toBe(OTHER_LANGUAGE);

    const translateServiceStub: TranslateService = fixture.debugElement.injector.get(TranslateService);
    expect(translateServiceStub.use).toHaveBeenCalledWith(OTHER_LANGUAGE);
  });
  it('should call the node service', () => {
    expect(component.audioNodes.length).toBe(1);
    expect(component.audioNodes[0]).toBe(mockNode);
  });
});
