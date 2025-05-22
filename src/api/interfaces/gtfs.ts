import { GTFSModel } from "@/models/gtfs";

export interface IGTFSService {
  getData(): Promise<GTFSModel>;
}
