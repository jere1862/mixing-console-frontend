import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { AudioNodeService } from '../node/audio-node.service';
import { AudioNode } from '../models/audio-node';
import 'rxjs/add/operator/retry';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private _language: string;
  private _audioNodes: AudioNode[];

  get language(): string {
    return this._language;
  }

  set language(language: string) {
    this._language = language;
  }

  get audioNodes(): AudioNode[] {
    return this._audioNodes;
  }

  set audioNodes(audioNodes: AudioNode[]) {
    this._audioNodes = audioNodes;
  }

  constructor(
    private translateService: TranslateService,
    private http: Http,
    private service: AudioNodeService
  ) {}

  ngOnInit(): void {
    this.language = this.translateService.currentLang;
    this.service.getNodes().subscribe(results => {
      this.audioNodes = results;
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
