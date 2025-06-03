import { IStopModel } from "@/models/stop";
import client from "@/plugins/axios";
import { IStopsService } from "../interfaces/stops";

export class StopsService implements IStopsService {
  async getStops(): Promise<IStopModel[]> {
    const { data } = await client.get("/stops");
    return data.map((x: any) => ({
      stopId: x.stop_id,
      stopName: x.stop_name,
      stopLat: x.stop_lat,
      stopLon: x.stop_lon
    }));
  }
}
