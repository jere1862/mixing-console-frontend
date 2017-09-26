import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { NodeService } from '../node/node.service';
import { SoundNode } from '../node/sound-node';
import 'rxjs/add/operator/retry';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private _language: string;
  private _nodes: SoundNode[];

  get language(): string {
    return this._language;
  }

  set language(language: string) {
    this._language = language;
  }

  constructor(
    private translateService: TranslateService,
    private http: Http,
    private service: NodeService
  ) {}

  ngOnInit(): void {
    this.language = this.translateService.currentLang;
    this.service.getNodes().subscribe(results => {
      this._nodes = results;
    });
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
