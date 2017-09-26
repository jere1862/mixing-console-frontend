import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SoundNode } from './sound-node';

export class InMemoryNodeService implements InMemoryDbService {

  createDb() {
    let nodes: SoundNode[] = [
     { id: 0, name: "zero" },
     { id: 1, name: "test" },
     { id: 2, name: "other" }
    ];
    return {nodes};
  }
}
