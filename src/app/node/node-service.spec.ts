import { TestBed, inject } from '@angular/core/testing';
import { NodeService } from './node.service';

describe('NodeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeService]
    });
  });

  it('should be created', inject([NodeService], (service: NodeService) => {
    expect(service).toBeTruthy();
  }));
  it('makes a http request', () => {
    // TODO: Make this test
  })
});
