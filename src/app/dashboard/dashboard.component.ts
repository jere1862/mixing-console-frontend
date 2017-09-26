import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private _language: string;
  private _nextLanguage: string;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.language = this.translateService.currentLang;
    this.setNextLanguage();
  }

  changeLanguage(): void {
    if (this.language === 'fr') {
      this.language = 'en';
    } else {
      this.language = 'fr';
    }

    this.translateService.use(this.language);

    this.setNextLanguage();
  }

  setNextLanguage(): void {
    if (this.language === 'fr') {
      this.nextLanguage = 'en';
    } else {
      this.nextLanguage = 'fr';
    }
  }

  get language(): string {
    return this._language;
  }

  set language(language: string) {
    this._language = language;
  }

  get nextLanguage(): string {
    return this._nextLanguage;
  }

  set nextLanguage(language: string) {
    this._nextLanguage = language;
  }

}
