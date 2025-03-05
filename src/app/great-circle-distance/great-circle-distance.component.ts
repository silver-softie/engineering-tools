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

  calculated_distance_m: number | undefined = undefined;
  display_unit: string = 'm';
  converted_distance: number | undefined = this.calculated_distance_m; // Displayed distance

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

  calculateFromLatDms() {
    if (this.from_lat_dec < 0.0) {
      this.from_lat_hemi = 'fromLatSouth';
    } else {
      this.from_lat_hemi = 'fromLatNorth';
    }

    const fromLatDms = this.decimalDegreesToDMS(Math.abs(this.from_lat_dec));
    this.from_lat_deg = fromLatDms.degrees;
    this.from_lat_min = fromLatDms.minutes;
    this.from_lat_sec = fromLatDms.seconds;
  }

  calculateFromLongDms() {
    if (this.from_long_dec < 0.0) {
      this.from_long_hemi = 'fromLongWest';
    } else {
      this.from_long_hemi = 'fromLongEast';
    }

    const fromLongDms = this.decimalDegreesToDMS(Math.abs(this.from_long_dec));
    this.from_long_deg = fromLongDms.degrees;
    this.from_long_min = fromLongDms.minutes;
    this.from_long_sec = fromLongDms.seconds;
  }

  calculateToLatDms() {
    if (this.to_lat_dec < 0.0) {
      this.to_lat_hemi = 'toLatSouth';
    } else {
      this.to_lat_hemi = 'toLatNorth';
    }

    const toLatDms = this.decimalDegreesToDMS(Math.abs(this.to_lat_dec));
    this.to_lat_deg = toLatDms.degrees;
    this.to_lat_min = toLatDms.minutes;
    this.to_lat_sec = toLatDms.seconds;
  }

  calculateToLongDms() {
    if (this.to_long_dec < 0.0) {
      this.to_long_hemi = 'toLongWest';
    } else {
      this.to_long_hemi = 'toLongEast';
    }

    const toLongDms = this.decimalDegreesToDMS(Math.abs(this.to_long_dec));
    this.to_long_deg = toLongDms.degrees;
    this.to_long_min = toLongDms.minutes;
    this.to_long_sec = toLongDms.seconds;
  }


  calculateDistance() {
    this.calculateFromLatDec();
    this.calculateFromLongDec()
    this.calculateToLatDec();
    this.calculateToLongDec()
    this.calculated_distance_m = this.haversineService.getDistance(this.from_lat_dec, this.from_long_dec, this.to_lat_dec, this.to_long_dec);
    this.converted_distance = this.calculated_distance_m;
    this.changeUnit(this.display_unit);
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

    this.calculated_distance_m = undefined;
    this.converted_distance = undefined;
    this.display_unit = 'm';
  }

  /**
   * Converts a decimal degree value to degrees, minutes, and seconds (DMS) format.
   *
   * @param decimalDegrees - The input value in decimal degrees format.
   * @returns An object containing the DMS representation:
   *          - `degrees`: The integral degree portion.
   *          - `minutes`: The integral minute portion (absolute value).
   *          - `seconds`: The rounded second portion (absolute value).
   */
  private decimalDegreesToDMS(decimalDegrees: number): { degrees: number, minutes: number, seconds: number } {
    // Extract the integral degree portion from the input
    const degrees = Math.floor(decimalDegrees);

    // Calculate the decimal portion of minutes
    const minutesDecimal = Math.abs((decimalDegrees - degrees) * 60);

    // Extract the integral minute portion
    const minutes = Math.floor(minutesDecimal);

    // Calculate the remaining seconds and round them
    const seconds = Math.round((minutesDecimal - minutes) * 60);

    // Return the DMS representation as an object
    return { degrees, minutes, seconds };
  }

  // Method to change units
  changeUnit(unit: string): void {
    if (!this.calculated_distance_m) return;

    this.display_unit = unit;

    // Convert the distance based on the selected unit
    switch (unit) {
      case 'm':
        this.converted_distance = this.calculated_distance_m;
        break;
      case 'km':
        this.converted_distance = this.calculated_distance_m / 1000;
        break;
      case 'miles':
        this.converted_distance = this.calculated_distance_m / 1609.34; // 1 mile = 1609.34 meters
        break;
      case 'nautical miles':
        this.converted_distance = this.calculated_distance_m / 1852; // 1 nautical mile = 1852 meters
        break;
      default:
        this.converted_distance = this.calculated_distance_m;
    }
  }

}
