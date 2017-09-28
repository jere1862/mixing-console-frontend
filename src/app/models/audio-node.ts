export class AudioNode {
  id: number;
  name: string;
  volume: number;
  low: number;
  med: number;
  high: number;
  latitude: number;
  longitude: number;
  isFix: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.volume = 0;
    this.low = 0;
    this.med = 0;
    this.high = 0;
    this.latitude = 0;
    this.longitude = 0;
    this.isFix = false;
  }
}
