import { Component, OnInit, Input } from '@angular/core';
import { AudioNode } from '../models/audio-node';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input()
  audioNodes: Array<AudioNode>;

  @Input()
  fixNode: AudioNode;

  constructor() { }

  ngOnInit(): void {

  }
}
