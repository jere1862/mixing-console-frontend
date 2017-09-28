import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { AudioNodeService } from '../node/audio-node.service';
import { AudioNode } from '../models/audio-node';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/retry';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private _language: string;
  private _nextLanguage: string;
  private _audioNodes: Observable<Array<AudioNode>>;

  get audioNodes(): Observable<Array<AudioNode>> {
    return this._audioNodes;
  }

  set audioNodes(audioNodes: Observable<Array<AudioNode>>) {
    this._audioNodes = audioNodes;
  }

  constructor(
    private translateService: TranslateService,
    private audioNodeService: AudioNodeService
  ) {}

  ngOnInit(): void {
    this.language = this.translateService.currentLang;
    this.audioNodes = Observable.fromPromise<Array<AudioNode>>(this.audioNodeService.getNodes());
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
