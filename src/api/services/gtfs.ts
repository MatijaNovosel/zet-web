import { BACKEND_URL } from "@/constants/app";
import { GTFSModel } from "@/models/gtfs";
import client from "@/plugins/axios";
import { IGTFSService } from "../interfaces/gtfs";

export class GTFSService implements IGTFSService {
  async getData(): Promise<GTFSModel> {
    const { data } = await client.get(`${BACKEND_URL}/get_data`);
    return data;
  }
}
