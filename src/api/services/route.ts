import client from "@/plugins/axios";
import { IRouteService } from "../interfaces/route";

export class RouteService implements IRouteService {
  async getRouteGeography(routeId: number): Promise<any> {
    const { data } = await client.get(`/route/${routeId}/geography`);
    return data;
  }
}
