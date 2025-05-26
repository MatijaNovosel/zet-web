export interface IRouteService {
  getRouteGeography(routeId: string): Promise<any>;
}
