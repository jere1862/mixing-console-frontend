import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { NodeService } from './node/node.service';

// Imports for loading & configuring the in-memory web api
import { HttpInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryNodeService }  from './node/in-memory-node.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCKCFCS2vYlGoddTC_X35OKeX5j6QZbUIw'
    }),
    HttpModule,
    HttpClientModule,
    HttpInMemoryWebApiModule.forRoot(InMemoryNodeService),
    AppRoutingModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [NodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
