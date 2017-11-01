import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AudioNode } from '../models/audio-node';
import { Observable } from 'rxjs/Observable';
import { SliderType } from '../console-slider/console-slider.component';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class AudioNodeService {
  private nodesUrl: string = 'api/nodes';
  private headers: Headers =  new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getNodes(): Promise<Array<AudioNode>> {
    return this.http.get(this.nodesUrl)
      .toPromise()
      .then(response => response.json().data)
      .catch(e => this.handleError(e));
  }

  notifyChange(node: AudioNode, sliderType: SliderType): Promise<number> {
    const url = `/notify?id=${node.id}`;
    return this.http
               .post(this.nodesUrl + url, {node: node, sliderType: sliderType})
               .toPromise()
               .then(response => response.status)
               .catch(e => this.handleError(e));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
