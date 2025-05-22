import { IGTFSRouteTripModel } from "./gtfs";

export interface IVehicleModel {
  trip: IGTFSRouteTripModel;
  type: string;
  position: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
  vehicle: {
    id: string;
  };
}
