export class AudioOutput {
  name: string;
  volume: number;
  low: number;
  med: number;
  high: number;

  constructor() {
    this.name = '';
    this.volume = 0;
    this.low = 0;
    this.med = 0;
    this.high = 0;
  }
}
