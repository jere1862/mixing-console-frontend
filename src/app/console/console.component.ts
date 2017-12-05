import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AudioNodeService } from '../services/audio-node.service';
import { MatTabChangeEvent, MatSliderChange, MatCheckboxChange } from '@angular/material';
import { AudioNode } from '../models/audio-node';
import { SliderType } from '../console-slider/console-slider.component';
import { ObservableMedia } from '@angular/flex-layout';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit, OnChanges {
  @Input()
  audioNodes: Array<AudioNode>;

  mobileNodes: Array<AudioNode> = Array<AudioNode>();
  fixNode: AudioNode;
  selectedTabIndex: number;
  cols: Observable<number>;

  readonly XL_NUMBER_OF_COLUMNS: number = 3;
  readonly LG_NUMBER_OF_COLUMNS: number = 2;
  readonly MD_TO_SM_NUMBER_OF_COLUMNS: number = 1;

  constructor(private audioNodeService: AudioNodeService, private observableMedia: ObservableMedia) { }

  ngOnInit(): void {
    this.selectedTabIndex = 0;
    this.makeCardsResponsive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['audioNodes'] && this.audioNodes !== undefined) {
      this.initializeAudioNodes();
    }
  }

  initializeAudioNodes(): void {
    if (this.mobileNodes.length && this.mobileNodes.length === this.audioNodes.length - 1) {
      this.mobileNodes.forEach((node, index) => {
        const newNodeValue = this.audioNodes.find(_node => _node.id === node.id);
        Object.keys(newNodeValue).forEach(key => this.mobileNodes[index][key] = newNodeValue[key]);
      });
    } else {
      this.mobileNodes = this.audioNodes.filter(node => !node.isFix);
    }
    this.fixNode = this.audioNodes.find(node => node.isFix);
    this.pushLastSlidersValues();
  }

  pushLastSlidersValues(): void {
    this.mobileNodes.forEach((mobileNode, index) => {
      if (mobileNode.autoAdjust) {
        this.mobileNodes[index].lastVolumeValue = mobileNode.volumeSlider;
        this.mobileNodes[index].lastLowValue = mobileNode.lowSlider;
        this.mobileNodes[index].lastMedValue = mobileNode.medSlider;
        this.mobileNodes[index].lastHighValue = mobileNode.highSlider;
      }
    });
  }

  onMarkerClicked(selectedMobileNodeIndex: number): void {
    this.selectedTabIndex = selectedMobileNodeIndex;
  }

  onSelectedTabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = tabChangeEvent.index;
  }

  onSliderChange(node: AudioNode, sliderTypeString: string, matSliderChange: MatSliderChange): void {
    this.audioNodeService.notifyChange(node.id, SliderType[sliderTypeString], matSliderChange.value).subscribe();
  }

  onAutoAdjustChange(node: AudioNode, matCheckboxChange: MatCheckboxChange): void {
    this.audioNodeService.notifyAutoAdjustChange(node.id, matCheckboxChange.checked).subscribe();
  }

  makeCardsResponsive(): void {
    const grid = new Map([
      ['xs', this.MD_TO_SM_NUMBER_OF_COLUMNS],
      ['sm', this.MD_TO_SM_NUMBER_OF_COLUMNS],
      ['md', this.MD_TO_SM_NUMBER_OF_COLUMNS],
      ['lg', this.LG_NUMBER_OF_COLUMNS],
      ['xl', this.XL_NUMBER_OF_COLUMNS]
    ]);

    let start: number;

    if (this.observableMedia.asObservable() !== undefined) {
      grid.forEach((cols, mqAlias) => {
        if (this.observableMedia.isActive(mqAlias)) {
          start = cols;
        }
      });

      this.cols = this.observableMedia.asObservable()
        .map(change => {
          return grid.get(change.mqAlias);
        })
        .startWith(start);
    }
  }
}
