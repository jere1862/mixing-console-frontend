import { Component, OnInit } from '@angular/core';
import { AudioOutput } from '../models/audio-output';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})

export class ConsoleComponent implements OnInit {
  mobileNodes: Array<AudioOutput>;
  fixNode: AudioOutput;
  autoAdjust: boolean = false;

  constructor(translateService: TranslateService) { }

  ngOnInit(): void {
    this.initializeMobileNodes();
    this.initializeFixNode();
  }

  initializeMobileNodes(): void {
    this.mobileNodes = new Array<AudioOutput>();

    for (let i = 0; i < 6; ++i) {
      const mobileNode: AudioOutput = new AudioOutput();
      mobileNode.name = 'Noeud mobile ' + i;
      mobileNode.volume = Math.floor(Math.random() * 257);
      mobileNode.high = Math.floor(Math.random() * 257);
      mobileNode.med = Math.floor(Math.random() * 257);
      mobileNode.low = Math.floor(Math.random() * 257);

      this.mobileNodes.push(mobileNode);
    }
  }

  initializeFixNode(): void {
    this.fixNode = new AudioOutput;
    this.fixNode.volume = Math.floor(Math.random() * 257);
    this.fixNode.high = Math.floor(Math.random() * 257);
    this.fixNode.med = Math.floor(Math.random() * 257);
    this.fixNode.low = Math.floor(Math.random() * 257);
  }

}
