import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AudioNodeService } from '../services/audio-node.service';
import { MatTabChangeEvent, MatSliderChange, MatCheckboxChange, MatSnackBar } from '@angular/material';
import { AudioNode } from '../models/audio-node';
import { SliderType } from '../console-slider/console-slider.component';
import { ObservableMedia } from '@angular/flex-layout';
import { TranslateService } from '@ngx-translate/core';

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
  @Input()
  limitVolume: boolean;

  mobileNodes: Array<AudioNode> = Array<AudioNode>();
  fixNode: AudioNode;
  selectedTabIndex: number;
  cols: Observable<number>;
  lastFixVolume: number = 0;
  lastMobileNodesVolumes: Array<number> = new Array<number>();

  readonly XL_NUMBER_OF_COLUMNS: number = 3;
  readonly LG_NUMBER_OF_COLUMNS: number = 2;
  readonly MD_TO_SM_NUMBER_OF_COLUMNS: number = 1;

  constructor(private audioNodeService: AudioNodeService,
              private observableMedia: ObservableMedia,
              private translateService: TranslateService,
              private snackbar: MatSnackBar) { }

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
    this.verifyVolumeLimitAndAutoAdjust();
  }

  verifyVolumeLimitAndAutoAdjust(): void {
    this.mobileNodes.forEach((mobileNode, index) => {
      if (this.limitVolume) {
        this.sendVolumeAlert(mobileNode, index);
      }

      if (mobileNode.autoAdjust) {
        this.setMobileNodesLastValues(mobileNode, index);
      }
    });
  }

  sendVolumeAlert(mobileNode: AudioNode, index: number): void {
    this.fixNode.lastVolumeValue = this.fixNode.volumeSlider;
    this.mobileNodes[index].lastVolumeValue = mobileNode.volumeSlider;

    // The last volumes are in global variables, these variables are then compared to the actual slider values in order
    // to determine if the limited slider value is inferior to the lasts
    if (this.fixNode.volumeSlider < this.lastFixVolume) {
      this.openAlert();
      this.lastFixVolume = this.fixNode.volumeSlider;
    }

    if (mobileNode.volumeSlider < this.lastMobileNodesVolumes[index]) {
      this.openAlert();
      this.lastMobileNodesVolumes[index] = mobileNode.volumeSlider;
    }
  }

  setMobileNodesLastValues(mobileNode: AudioNode, index: number): void {
    this.mobileNodes[index].lastVolumeValue = mobileNode.volumeSlider;
    this.mobileNodes[index].lastLowValue = mobileNode.lowSlider;
    this.mobileNodes[index].lastMedValue = mobileNode.medSlider;
    this.mobileNodes[index].lastHighValue = mobileNode.highSlider;
  }

  onMarkerClicked(selectedMobileNodeIndex: number): void {
    this.selectedTabIndex = selectedMobileNodeIndex;
  }

  onSelectedTabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = tabChangeEvent.index;
  }

  onSliderChange(node: AudioNode, sliderTypeString: string, matSliderChange: MatSliderChange): void {
    if (SliderType[sliderTypeString] === 0) {
      this.pushLastVolumeValues(node, matSliderChange.value);
    }

    this.audioNodeService.notifyChange(node.id, SliderType[sliderTypeString], matSliderChange.value).subscribe();
  }

  pushLastVolumeValues(node: AudioNode, sliderValue: number): void {
    if (node.isFix) {
      this.lastFixVolume = sliderValue;
    } else {
      const index: number = this.mobileNodes.findIndex(mobileNode => {
        return mobileNode === node;
      });

      this.lastMobileNodesVolumes[index] = sliderValue;
    }
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

  openAlert(): void {
    this.translateService.get('DASHBOARD.VOLUME_EXCEEDED').subscribe(text => {
      this.snackbar.open(text,
        null, {
          'verticalPosition': 'top',
          'duration': 4000
         });
    });
  }
}
