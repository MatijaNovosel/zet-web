import { IRouteGeographyModel } from "@/models/geography";

export interface IRouteService {
  getRouteGeography(routeId: string): Promise<IRouteGeographyModel>;
}
