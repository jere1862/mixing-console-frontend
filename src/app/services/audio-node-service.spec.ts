import { AudioNodeService } from './audio-node.service';
import { AudioNode } from '../models/audio-node';
import { TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { mockNode } from '../mocks/audio-node-mock';

describe('NodeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        Http,
        AudioNodeService
      ]
    });
  });

  it ('should be created', inject([AudioNodeService, ConnectionBackend], (audioNodeService: AudioNodeService, backend: MockBackend) => {
    expect(audioNodeService).toBeTruthy();
  }));

  it ('should fetch nodes', fakeAsync(inject([AudioNodeService, ConnectionBackend],
    (audioNodeService: AudioNodeService, backend: MockBackend) => {
    let result: Array<AudioNode>;
    backend.connections.subscribe((connection: any) => this.lastConnection = connection);

    audioNodeService.getNodes().subscribe(data => result = data['data']);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ data: [mockNode] }),
    })));

    tick();

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(mockNode);
  })));

});
