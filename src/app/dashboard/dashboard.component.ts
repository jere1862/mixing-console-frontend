import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { AudioNodeService } from '../services/audio-node.service';
import { AudioNode } from '../models/audio-node';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private _language: string;
  private _nextLanguage: string;
  private _audioNodesObservableResponse: Array<AudioNode>;

  get audioNodesObservableResponse(): Array<AudioNode> {
    return this._audioNodesObservableResponse;
  }

  set audioNodesObservableResponse(audioNodes: Array<AudioNode>) {
    this._audioNodesObservableResponse = audioNodes;
  }


  constructor(
    private translateService: TranslateService,
    private audioNodeService: AudioNodeService
  ) { }

  ngOnInit(): void {
    Observable.fromPromise<Array<AudioNode>>(this.audioNodeService.getNodes())
              .subscribe((res) => this.audioNodesObservableResponse = res);

    Observable.interval(1000)
                .switchMap(() => this.audioNodeService.getNodes())
                .subscribe((res) => this.audioNodesObservableResponse = res);

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
