import { IStopModel } from "@/models/stop";
import { IVehicleModel } from "@/models/vehicle";
import { LayerGroup, Marker } from "leaflet";

export interface IMapService {
  createMap(): void;
  goToLocation(coords: [number, number]): void;
  updateMarkerCoords(marker: Marker, coords: [number, number]): void;
  animateMarkerToCoords(marker: Marker, coords: [number, number]): void;
  rotateVehicleMarker(marker: Marker, vehicle: IVehicleModel): void;
  goToVehicleLocation(vehicleId: string): void;
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
  addVehicleMarker(vehicle: IVehicleModel): void;

  getMarker(vehicleId: string): Marker | undefined;

  addStopMarker(stop: IStopModel): void;

  isInViewport(coords: [number, number]): boolean;

  updateVisibleMarkers(): void;
  removeActiveStopMarker(): void;
  getVehicleMarkers(): Map<string, Marker>;

  trackVehicle(vehicle: IVehicleModel): void;
  removeActiveVehicle(): void;
  stopTrackingVehicle(): void;
  goToStopLocation(stopId: string): void;
}
