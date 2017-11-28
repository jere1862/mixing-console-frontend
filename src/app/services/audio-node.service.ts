import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AudioNode } from '../models/audio-node';
import { Observable } from 'rxjs/Observable';
import { SliderType } from '../console-slider/console-slider.component';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class AudioNodeService {
  private nodesUrl: string = 'http://localhost:9000/api/nodes';
  private limitVolumeUrl: string = '/limitSound';
  private notifyChangeUrl: string = '/change';
  private adjustAutomaticallyUrl: string = '/automaticAdjustment';

  private headers: Headers =  new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getNodes(): Observable<Array<AudioNode>> {
    return this.http
               .get(this.nodesUrl)
               .map(res => res.json())
               .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  notifyChange(nodeId: Number, sliderType: SliderType, value: Number): Observable<number> {
    return this.http
               .put(this.nodesUrl + this.notifyChangeUrl, {id: nodeId, sliderType: sliderType, value: value}, {headers: this.headers})
               .map(res => res.status)
               .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  notifyAutoAdjustChange(nodeId: number, autoAdjust: boolean): Promise<number> {
    return this.http
               .put(this.nodesUrl + this.adjustAutomaticallyUrl, {id: nodeId, autoAdjust: autoAdjust}, {headers: this.headers})
               .toPromise()
               .then(response => response.status)
               .catch(e => this.handleError(e));
  }

  limitVolume(limitVolume: boolean): Promise<boolean> {
    return this.http
               .put(this.nodesUrl + this.limitVolumeUrl, {limitVolume: limitVolume}, {headers: this.headers})
               .toPromise()
               .then(response => response.status)
               .catch(e => this.handleError(e));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
