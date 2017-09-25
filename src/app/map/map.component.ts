import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number;
  lng: number;

  constructor() { }

  ngOnInit(): void {
    this.lat = 12.0;
    this.lng = 12.0;
  }
}
