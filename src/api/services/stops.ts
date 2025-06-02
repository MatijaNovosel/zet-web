import { IStopModel } from "@/models/stop";
import client from "@/plugins/axios";
import { IStopsService } from "../interfaces/stops";

export class StopsService implements IStopsService {
  async getStops(): Promise<IStopModel[]> {
    const { data } = await client.get("/stops");
    return data;
  }
}
