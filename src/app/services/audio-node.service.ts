import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AudioNode } from '../models/audio-node';
import { Observable } from 'rxjs/Rx';
import { SliderType } from '../console-slider/console-slider.component';
import 'rxjs/add/operator/catch';


@Injectable()
export class AudioNodeService {
  private nodesUrl: string = 'http://localhost:9000/api/nodes';
  private limitVolumeUrl: string = '/limitSound';
  private notifyChangeUrl: string = '/change';
  private autoAdjustUrl: string = '/automaticAdjustment';

  private headers: Headers =  new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getNodes(): Observable<Array<AudioNode>> {
    return this.http.get(this.nodesUrl)
                    .map(res => res.json())
                    .catch(e => this.handleError(e));
  }

  notifyChange(nodeId: Number, sliderType: SliderType, value: Number): Observable<number> {
    return this.makeHttpRequest(this.http
               .put(this.nodesUrl + this.notifyChangeUrl,
                   {id: nodeId, sliderType: sliderType, value: value},
                   {headers: this.headers}));
  }

  notifyAutoAdjustChange(nodeId: number, autoAdjust: boolean): Observable<number> {
    return this.makeHttpRequest(this.http
               .put(this.nodesUrl + this.autoAdjustUrl,
                   {id: nodeId, adjustAutomatically: autoAdjust},
                   {headers: this.headers}));
  }

  limitVolume(limitVolume: boolean): Observable<number> {
    return this.makeHttpRequest(this.http
               .put(this.nodesUrl + this.limitVolumeUrl,
                   {isSoundLimited: limitVolume},
                   {headers: this.headers}));
  }

  private makeHttpRequest(obs: Observable<any>): Observable<any> {
    return obs.map(res => res.status)
              .catch(e => this.handleError(e));
  }

  private handleError(error: any): Observable<any> {
    return Observable.throw(new Error(error.status + ': ' + error.statusText + ' while calling ' + error.url));
  }
}
