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
  markerOpacity: number;
  autoAdjust: boolean;
  volumeSlider: number;
  lowSlider: number;
  medSlider: number;
  highSlider: number;
  lastVolumeValue?: number;
  lastLowValue?: number;
  lastMedValue?: number;
  lastHighValue?: number;

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
    this.markerOpacity = 0.6;
    this.autoAdjust = false;
    this.volumeSlider = 128;
    this.lowSlider = 128;
    this.medSlider = 128;
    this.highSlider = 128;
  }
}
