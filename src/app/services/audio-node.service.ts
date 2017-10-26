import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AudioNode } from '../models/audio-node';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class AudioNodeService {
  private nodesUrl: string = 'api/nodes';

  constructor(private http: Http) { }

  getNodes(): Promise<Array<AudioNode>> {
    return this.http.get(this.nodesUrl)
      .toPromise()
      .then(response => response.json().data)
      .catch(e => this.handleError(e));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
