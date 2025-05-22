import { BACKEND_URL } from "@/constants/app";
import { GTFSModel } from "@/models/gtfs";
import axios from "axios";
import { IGTFSService } from "../interfaces/gtfs";

export class GTFSService implements IGTFSService {
  async getData(): Promise<GTFSModel> {
    const { data } = await axios.get(`${BACKEND_URL}/get_data`);
    return data;
  }
}
