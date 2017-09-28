import { TestBed, inject, fakeAsync, tick} from '@angular/core/testing';
import { AudioNodeService } from './audio-node.service';
import { AudioNode } from '../models/audio-node';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions} from '@angular/http';

import {Jsonp, JsonpModule} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('NodeServiceService', () => {
  let service: AudioNodeService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AudioNodeService,
        MockBackend,
        BaseRequestOptions,
        {
           provide: Http,
           useFactory: (backend, options) => new Http(backend, options),
           deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
    service = TestBed.get(AudioNodeService);
    backend = TestBed.get(MockBackend);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getNodes should return nodes', () => {
    let response = { 
      "resultCount": 1,
      "results": [
        {
          "artistId": 78500,
          "artistName": "U2",
          "trackName": "Beautiful Day",
          "artworkUrl60": "image.jpg",
        }]
    };

    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(response)
      }));
    });
    
    service.getNodes().subscribe(result => {
      //console.log(result);
    }); 
  });
});
