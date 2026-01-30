import { IGTFSVehicleModel } from "@/models/gtfs";

export interface IGTFSService {
  getData(): Promise<IGTFSVehicleModel[]>;
}
