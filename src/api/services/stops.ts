import { IStopArrivalModel, IStopModel } from "@/models/stop";
import client from "@/plugins/axios";
import { IStopsService } from "../interfaces/stops";

export class StopsService implements IStopsService {
  async getArrivals(stopId: string): Promise<IStopArrivalModel[]> {
    const { data } = await client.get(`/arrivals/${stopId}`);
    return data.sort(
      (a: IStopArrivalModel, b: IStopArrivalModel) =>
        a.arrivalTimeInMinutes - b.arrivalTimeInMinutes
    );
  }

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
