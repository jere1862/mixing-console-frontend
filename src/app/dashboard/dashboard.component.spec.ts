import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MapComponent } from '../map/map.component';
import { AudioNodeService } from '../services/audio-node.service';
import { AudioNode } from '../models/audio-node';
import { mockNode } from '../mocks/audio-node-mock';
import { SliderType } from '../console-slider/console-slider.component';
import { Observable } from 'rxjs/Observable';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const INITIAL_CURRENT_LANG: string = 'fr';
const OTHER_LANGUAGE: string = 'en';

@Pipe({ name: 'translate' })
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
  getNodes = () => Observable.of(Array.of(mockNode));
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, MapComponent, MockPipe],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceStub
        },
        {
          provide: AudioNodeService,
          useClass: AudioNodeServiceStub
        },
        {
          provide: HttpClient
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
  it('should set next language', () => {
    expect(component.nextLanguage).toBe(OTHER_LANGUAGE);
    component.changeLanguage();
    expect(component.nextLanguage).toBe(INITIAL_CURRENT_LANG);
  });
});
