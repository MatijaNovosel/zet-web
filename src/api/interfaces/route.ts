import { IRouteGeographyModel } from "@/models/geography";

export interface IRouteService {
  getRouteGeography(routeId: number): Promise<IRouteGeographyModel>;
}
