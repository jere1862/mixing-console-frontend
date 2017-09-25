import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../node_modules/roboto-fontface/css/roboto/roboto-fontface.css',
     ]
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('fr');
    translateService.use('fr');
  }
}
