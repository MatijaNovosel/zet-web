import { IStopModel } from "@/models/stop";

export interface IStopsService {
  getStops(): Promise<IStopModel[]>;
}
