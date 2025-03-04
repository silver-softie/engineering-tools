import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HaversineService {

  // Earth radius in kilometers
  private readonly RADIUS_OF_EARTH_KM = 6371;

  /**
   * Calculates the distance between two geographic points using the Haversine formula.
   * @param lat1 Latitude of the first point in decimal degrees
   * @param lon1 Longitude of the first point in decimal degrees
   * @param lat2 Latitude of the second point in decimal degrees
   * @param lon2 Longitude of the second point in decimal degrees
   * @returns Distance in kilometers
   */
  public getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Convert degrees to radians
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    // Haversine formula
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return this.RADIUS_OF_EARTH_KM * c; // Distance in kilometers
  }
}
