import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { AudioNode } from '../models/audio-node';

export class InMemoryNodeService implements InMemoryDbService {

  createDb() {
    let nodes: Array<AudioNode> = [
      {
        id: 1,
        name: "left mic",
        volume: 95,
        low: 12,
        med: 40,
        high: 50,
        latitude: 45.378008,
        longitude: -71.9269062,
        isFix: false
      },
      {
        id: 2,
        name: "right mic",
        volume: 95,
        low: 60,
        med: 20,
        high: 70,
        latitude: 45.378478,
        longitude: -71.9277089,
        isFix: false
      },
      {
        id: 3,
        name: "back mic",
        volume: 95,
        low: 40,
        med: 40,
        high: 10,
        latitude: 45.378248,
        longitude: -71.9280432,
        isFix: false
      },
    ];
    return { nodes };
  }
}
