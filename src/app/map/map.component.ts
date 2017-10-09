import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AudioNode } from '../models/audio-node';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  private readonly selectedMarkerOpacity: number = 0.6;
  private readonly defaultMarkerOpacity: number = 1;

  @Input()
  mobileNodes: Array<AudioNode>;

  @Input()
  fixNode: AudioNode;

  @Input()
  selectedMobileNodeIndex: number;

  @Output()
  onMarkerClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedMobileNodeIndex']) {
      console.log('changed');
      this.setMarkersOpacity();
    }
  }

  emitSelectedMobileNodeIndex(mobileNodeIndex: number): void {
    this.selectedMobileNodeIndex = mobileNodeIndex;
    this.onMarkerClicked.emit(this.selectedMobileNodeIndex);
    this.setMarkersOpacity();
  }

  setMarkersOpacity(): void {
    for (let i = 0; i < this.mobileNodes.length; ++i) {
      if (i === this.selectedMobileNodeIndex) {
        this.mobileNodes[i].markerOpacity = this.selectedMarkerOpacity;
      } else {
        this.mobileNodes[i].markerOpacity = this.defaultMarkerOpacity;
      }
    }
  }
}
