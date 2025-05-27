import { IRouteGeographyModel } from "@/models/geography";
import client from "@/plugins/axios";
import { IRouteService } from "../interfaces/route";

export class RouteService implements IRouteService {
  async getRouteGeography(routeId: string): Promise<IRouteGeographyModel> {
    const { data } = await client.get(`/route/${routeId}/geography`);
    return data;
  }
}
