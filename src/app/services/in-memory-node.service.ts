import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { AudioNode } from '../models/audio-node';

export class DbNode {
  limitVolume: boolean;
  nodes: Array<AudioNode>;
}

@Injectable()
export class InMemoryNodeService implements InMemoryDbService {

  createDb(): DbNode {
    const dbNode: DbNode = {
      limitVolume: false,
      nodes: [
      {
        id: 1,
        name: 'mic 1',
        volume: 95,
        low: 12,
        med: 40,
        high: 50,
        latitude: 45.378008,
        longitude: -71.9269062,
        isFix: false,
        markerOpacity: 1,
        autoAdjust: false,
        volumeSlider: 128,
        lowSlider: 128,
        medSlider: 128,
        highSlider: 128
      },
      {
        id: 2,
        name: 'mic 2',
        volume: 95,
        low: 60,
        med: 20,
        high: 70,
        latitude: 45.378478,
        longitude: -71.9277089,
        isFix: false,
        markerOpacity: 0.6,
        autoAdjust: false,
        volumeSlider: 128,
        lowSlider: 128,
        medSlider: 128,
        highSlider: 128
      },
      {
        id: 3,
        name: 'mic 3',
        volume: 95,
        low: 40,
        med: 40,
        high: 10,
        latitude: 45.378248,
        longitude: -71.9280432,
        isFix: false,
        markerOpacity: 0.6,
        autoAdjust: false,
        volumeSlider: 128,
        lowSlider: 128,
        medSlider: 128,
        highSlider: 128
      },
      {
        id: 4,
        name: 'fix mic',
        volume: 50,
        low: 20,
        med: 70,
        high: 30,
        latitude: 45.378248,
        longitude: -71.927424,
        isFix: true,
        markerOpacity: 0.6,
        autoAdjust: false,
        volumeSlider: 128,
        lowSlider: 128,
        medSlider: 128,
        highSlider: 128
      }],
    };
    return { nodes: dbNode.nodes, limitVolume: dbNode.limitVolume };
  }
}
