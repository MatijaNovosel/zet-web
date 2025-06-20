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
  vehicleId: number | null;
  isRealtimeConfirmed: boolean;
  realtimeDataTimestamp: string;
  routeId: string;
  scheduledArrivalTime: string;
  tripId: string;
}
