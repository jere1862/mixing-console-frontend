import { Component, OnInit } from '@angular/core';
import { AudioNode } from '../models/audio-node';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})

export class ConsoleComponent implements OnInit {
  mobileNodes: Array<AudioNode>;
  fixNode: AudioNode;
  autoAdjust: boolean = false;

  constructor(translateService: TranslateService) { }

  ngOnInit(): void {
    this.initializeMobileNodes();
    this.initializeFixNode();
  }

  initializeMobileNodes(): void {
    this.mobileNodes = new Array<AudioNode>();

    for (let i = 0; i < 6; ++i) {
      const mobileNode: AudioNode = new AudioNode();
      mobileNode.name = 'Noeud mobile ' + i;
      mobileNode.volume = Math.floor(Math.random() * 257);
      mobileNode.high = Math.floor(Math.random() * 257);
      mobileNode.med = Math.floor(Math.random() * 257);
      mobileNode.low = Math.floor(Math.random() * 257);

      this.mobileNodes.push(mobileNode);
    }
  }

  initializeFixNode(): void {
    this.fixNode = new AudioNode;
    this.fixNode.volume = Math.floor(Math.random() * 257);
    this.fixNode.high = Math.floor(Math.random() * 257);
    this.fixNode.med = Math.floor(Math.random() * 257);
    this.fixNode.low = Math.floor(Math.random() * 257);
  }

}
