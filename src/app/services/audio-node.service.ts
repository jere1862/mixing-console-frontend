import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AudioNode } from '../models/audio-node';
import { Observable } from 'rxjs/Observable';
import { SliderType } from '../console-slider/console-slider.component';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class AudioNodeService {
  private nodesUrl: string = 'http://localhost:9000/api/nodes';
  private headers: Headers =  new Headers({'Content-Type': 'application/json', });

  constructor(private http: Http) { }

  getNodes(): Observable<Array<AudioNode>> {
    return this.http
               .get(this.nodesUrl)
               .map(res => res.json())
               .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  notifyChange(nodeId: Number, sliderType: SliderType, value: Number): Observable<number> {
    const url = `/${nodeId}`;
    return this.http
               .put(this.nodesUrl + url, {sliderType: sliderType, value: value, headers: this.headers})
               .map(res => res.status)
               .catch(error => Observable.throw(error.json().error || 'Server error'));
  }
}
