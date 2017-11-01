import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AudioNodeService } from '../services/audio-node.service';
import { MdTabChangeEvent, MdSliderChange } from '@angular/material';
import { AudioNode } from '../models/audio-node';
import { SliderType } from '../console-slider/console-slider.component';

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
  autoAdjust: boolean = false;
  selectedTabIndex: number;

  constructor(private audioNodeService: AudioNodeService) { }

  ngOnInit(): void {
    this.selectedTabIndex = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['audioNodes'] && this.audioNodes !== undefined) {
      this.initializeAudioNodes();
    }
  }

  initializeAudioNodes(): void {
    if (this.mobileNodes.length) {
      this.mobileNodes.forEach(node => {
        node = this.audioNodes.find(_node => _node.id === node.id);
      });
    } else {
      this.mobileNodes = this.audioNodes.filter(node => !node.isFix);
    }
    this.fixNode = this.audioNodes.find(node => node.isFix);
  }

  onMarkerClicked(selectedMobileNodeIndex: number): void {
    this.selectedTabIndex = selectedMobileNodeIndex;
  }

  onSelectedTabChanged(tabChangeEvent: MdTabChangeEvent): void {
    this.selectedTabIndex = tabChangeEvent.index;
  }

  onSliderChange(node: AudioNode, sliderTypeString: string): void {
    console.log(node);
    console.log(sliderTypeString);
    console.log(SliderType[sliderTypeString]);
    this.audioNodeService.notifyChange(node, SliderType[sliderTypeString]);
  }
}
