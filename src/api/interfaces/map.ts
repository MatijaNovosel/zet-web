import { LayerGroup, Marker } from "leaflet";

export interface IMapService {
  createMap(leafletInstance: any): void;
  goToLocation(coords: [number, number]): void;
  updateMarkerCoords(marker: Marker, coords: [number, number]): void;
  animateMarkerToCoords(marker: Marker, coords: [number, number], vehicleId: number): void;
  rotateMarker(
    marker: Marker,
    coords: [number, number],
    routeId: string,
    color: string,
    vehicleId: string
  ): void;
  removeVehicleMarker(marker: Marker, vehicleId: string): void;
  updateCurrentLocation(coords: [number, number]): void;
  changeMapType(type: number): void;

  removeLayer(layer: LayerGroup): void;
  addLayer(layer: LayerGroup): void;

  hideAllRoutes(): void;
  addRouteLayer(id: string): void;
  addRouteGeography(id: string, geography: any): void;
  getRouteLayer(id: string): LayerGroup | undefined;
  hasRouteGeography(id: string): boolean;

  addVehicleLayer(id: string): void;
  getVehicleLayer(id: string): LayerGroup | undefined;
  addVehicleMarker(
    vehicleId: string,
    routeId: string,
    position: [number, number],
    color: string
  ): void;

  getMarker(vehicleId: string): Marker | undefined;

  isInViewport(coords: [number, number]): boolean;
}
