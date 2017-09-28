import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AudioNode } from '../models/audio-node';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class AudioNodeService {
  private nodesUrl = 'api/nodes';
  private nodes: AudioNode;

  constructor(private http: Http) {}

  // Get nodes data
  getNodes(): Observable<AudioNode[]> {
    return this.http.get(this.nodesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  private extractData(res: Response) {
    const body = res.json();
    return (body && body.data) || { };
  }

  private handleError(error: any){
    console.error(error);
    return Observable.throw(error);
  }

}
