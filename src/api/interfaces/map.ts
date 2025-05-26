import { Layer, Marker } from "leaflet";

export interface IMapService {
  createMap(leafletInstance: any): void;
  goToLocation(coords: [number, number]): void;
  updateMarkerCoords(marker: Marker, coords: [number, number]): void;
  animateMarkerToCoords(marker: Marker, coords: [number, number]): void;

  removeLayer(layer: Layer): void;
  addLayer(layer: Layer): void;

  addRouteLayer(id: string): void;

  addVehicleLayer(id: string): void;
  getVehicleLayer(id: string): Layer | undefined;
  addVehicleMarker(
    vehicleId: string,
    routeId: string,
    position: [number, number],
    color: string
  ): void;

  getMarker(vehicleId: string): Marker | undefined;
}
