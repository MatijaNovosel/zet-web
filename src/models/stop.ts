export interface IStopModel {
  stopId: string;
  stopName: string;
  stopLat: number;
  stopLon: number;
}

export interface IStopArrivalModel {
  airDistanceInMeters: number;
  arrivalTimeInMinutes: number;
  calculatedArrivalTime: string;
  delayInSeconds: number | null;
  vehicleId: string | null;
  isRealtimeConfirmed: boolean;
  realtimeDataTimestamp: string;
  routeId: string;
  scheduledArrivalTime: string;
  tripId: string;
}

export interface IBajsStopModel {
  uid: number;
  lat: number;
  lng: number;
  name: string;
  bikes_available_to_rent: number;
  bike_racks: number;
}
