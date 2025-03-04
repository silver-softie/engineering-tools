import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HaversineService } from '../services/haversine.service';

@Component({
  selector: 'app-great-circle-distance',
  imports: [CommonModule, FormsModule],
  templateUrl: './great-circle-distance.component.html',
  styleUrl: './great-circle-distance.component.css'
})
export class GreatCircleDistanceComponent {
  from_lat_deg: number = 0.0;
  from_lat_min: number = 0.0;
  from_lat_sec: number = 0.0;
  from_long_deg: number = 0.0;
  from_long_min: number = 0.0;
  from_long_sec: number = 0.0;
  from_lat_dec: number = 0.0;
  from_long_dec: number = 0.0;
  from_lat_hemi: string = 'fromLatNorth';
  from_long_hemi: string = 'fromLongEast';

  to_lat_deg: number = 0.0;
  to_lat_min: number = 0.0;
  to_lat_sec: number = 0.0;
  to_long_deg: number = 0.0;
  to_long_min: number = 0.0;
  to_long_sec: number = 0.0;
  to_lat_dec: number = 0.0;
  to_long_dec: number = 0.0;
  to_lat_hemi: string = 'toLatNorth';
  to_long_hemi: string = 'toLongEast';

  invalidFromLat: boolean = false;
  invalidFromLong: boolean = false;
  invalidToLat: boolean = false;
  invalidToLong: boolean = false;

  calculated_distance_km: number | undefined = undefined;

  constructor(private haversineService: HaversineService) {
  }

  calculateFromLatDec() {
    this.from_lat_dec =
      Number(this.from_lat_deg) +
      Number(this.from_lat_min) / 60.0 +
      Number(this.from_lat_sec) / 3600.0;

    if (this.from_lat_hemi === 'fromLatSouth') {
      this.from_lat_dec = -this.from_lat_dec;
    }

    this.invalidFromLat = this.from_lat_dec < -90.0 || this.from_lat_dec > 90.0;
  }

  calculateFromLongDec() {
    this.from_long_dec =
      Number(this.from_long_deg) +
      Number(this.from_long_min) / 60.0 +
      Number(this.from_long_sec) / 3600.0;

    if (this.from_long_hemi === 'fromLongWest') {
      this.from_long_dec = -this.from_long_dec;
    }

    this.invalidFromLong = this.from_long_dec < -180.0 || this.from_long_dec > 180.0;
  }

  calculateToLatDec() {
    this.to_lat_dec =
      Number(this.to_lat_deg) +
      Number(this.to_lat_min) / 60.0 +
      Number(this.to_lat_sec) / 3600.0;

    if (this.to_lat_hemi === 'toLatSouth') {
      this.to_lat_dec = -this.to_lat_dec;
    }

    this.invalidToLat = this.to_lat_dec < -90.0 || this.to_lat_dec > 90.0;
  }

  calculateToLongDec() {
    this.to_long_dec =
      Number(this.to_long_deg) +
      Number(this.to_long_min) / 60.0 +
      Number(this.to_long_sec) / 3600.0;

    if (this.to_long_hemi === 'toLongWest') {
      this.to_long_dec = -this.to_long_dec;
    }

    this.invalidToLong = this.to_long_dec < -180.0 || this.to_long_dec > 180.0;
  }

  calculate() {
    this.calculated_distance_km = this.haversineService.getDistance(this.from_lat_dec, this.from_long_dec, this.to_lat_dec, this.to_long_dec);
  }

  reset() {
    this.from_lat_deg = 0.0;
    this.from_lat_min = 0.0;
    this.from_lat_sec = 0.0;
    this.from_long_deg = 0.0;
    this.from_long_min = 0.0;
    this.from_long_sec = 0.0;
    this.from_lat_dec = 0.0;
    this.from_long_dec = 0.0;
    this.from_lat_hemi = 'fromLatNorth';
    this.from_long_hemi = 'fromLongEast';

    this.to_lat_deg = 0.0;
    this.to_lat_min = 0.0;
    this.to_lat_sec = 0.0;
    this.to_long_deg = 0.0;
    this.to_long_min = 0.0;
    this.to_long_sec = 0.0;
    this.to_lat_dec = 0.0;
    this.to_long_dec = 0.0;
    this.to_lat_hemi = 'toLatNorth';
    this.to_long_hemi = 'toLongEast';

    this.calculated_distance_km = undefined;
  }

}
