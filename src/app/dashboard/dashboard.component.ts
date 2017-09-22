import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private language: string;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.language = this.translateService.currentLang;
  }

  changeLanguage(): void {
    if (this.language === 'fr') {
      this.language = 'en';
    } else {
      this.language = 'fr';
    }

    this.translateService.use(this.language);
  }

}
