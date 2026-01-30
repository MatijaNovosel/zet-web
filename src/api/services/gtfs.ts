import { IGTFSVehicleModel } from "@/models/gtfs";
import client from "@/plugins/axios";
import { IGTFSService } from "../interfaces/gtfs";

export class GTFSService implements IGTFSService {
  async getData(): Promise<IGTFSVehicleModel[]> {
    const { data } = await client.get("/get_vehicle_data");
    return data;
  }
}
