import { IStopModel } from "@/models/stop";
import client from "@/plugins/axios";
import { IStopsService } from "../interfaces/stops";

export class StopsService implements IStopsService {
  async getStops(): Promise<IStopModel[]> {
    const { data } = await client.get("/stops");
    return data.map((x: any) => ({
      stopId: x.stop_id,
      stopCode: x.stop_code,
      stopName: x.stop_name,
      stopDesc: x.stop_desc,
      stopLat: x.stop_lat,
      stopLon: x.stop_lon,
      zoneId: x.zone_Id,
      stopUrl: x.stop_url,
      locationType: x.location_type,
      parentStation: x.parent_station
    }));
  }
}
