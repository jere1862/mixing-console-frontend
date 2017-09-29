import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AudioNode } from '../models/audio-node';

import { TranslateService } from '@ngx-translate/core';

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
  numberOfMobileNodes: number;

  constructor(translateService: TranslateService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['audioNodes'] && this.audioNodes !== undefined) {
      this.initializeAudioNodes();
    }
  }

  initializeAudioNodes(): void {
    this.audioNodes.forEach(audioNode => {
      if (audioNode.isFix) {
        this.fixNode = audioNode;
      } else {
        this.mobileNodes.push(audioNode);
      }
    });
  }

}
