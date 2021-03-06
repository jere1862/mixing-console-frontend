import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsoleComponent } from './console/console.component';
import { ConsoleSliderComponent } from './console-slider/console-slider.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { AudioNodeService } from './services/audio-node.service';
import { FlexLayoutModule } from '@angular/flex-layout';

// Imports for loading & configuring the in-memory web api
import { HttpInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryNodeService } from './services/in-memory-node.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConsoleComponent,
    ConsoleSliderComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCKCFCS2vYlGoddTC_X35OKeX5j6QZbUIw'
    }),
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    FlexLayoutModule
  ],
  providers: [AudioNodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
