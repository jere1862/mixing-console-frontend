import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: class {
            use: jasmine.Spy = jasmine.createSpy('use');
            setDefaultLang: jasmine.Spy = jasmine.createSpy('setDefaultLang');
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should call the translate service', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const translateService = fixture.debugElement.injector.get(TranslateService);

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('fr');
    expect(translateService.use).toHaveBeenCalledWith('fr');
  }));
  it('should contain a router outlet', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  }));
});
