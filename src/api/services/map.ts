import { DEFAULT_LOCATION, MAPTILER_KEY, POLLING_DURATION } from "@/constants/app";
import { Layer, Map as LeafletMap, Marker } from "leaflet";
import { IMapService } from "./../interfaces/map";

export class MapService implements IMapService {
  map: LeafletMap | null = null;

  vehicleMarkers: Map<string, Marker> = new Map();
  routeLinestrings: Map<string, Marker> = new Map();

  vehicleLayers: Map<string, Layer> = new Map();
  routeLayers: Map<string, Layer> = new Map();

  leafletInstance: any;

  createMap(leafletInstance: any): void {
    this.leafletInstance = leafletInstance;
    this.map = leafletInstance.map("map", { zoomControl: false });
    this.map!.setView(
      {
        lat: DEFAULT_LOCATION[0],
        lng: DEFAULT_LOCATION[1]
      },
      14
    );
    leafletInstance.maptiler
      .maptilerLayer({
        apiKey: MAPTILER_KEY,
        style: leafletInstance.maptiler.MapStyle.STREETS
      })
      .addTo(this.map);
  }

  goToLocation(coords: [number, number]): void {
    this.map!.flyTo(coords, 18, {
      animate: true,
      duration: 1
    });
  }

  updateMarkerCoords(marker: Marker, coords: [number, number]): void {
    throw new Error("Method not implemented.");
  }

  animateMarkerToCoords(marker: Marker, coords: [number, number]): void {
    const startLatLng = marker.getLatLng();
    const startTime = performance.now();

    function animate(time: number) {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / POLLING_DURATION, 1);

      const lat = startLatLng.lat + (coords[0] - startLatLng.lat) * t;
      const lng = startLatLng.lng + (coords[1] - startLatLng.lng) * t;

      marker.setLatLng([lat, lng]);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  removeLayer(layer: Layer): void {
    this.map!.removeLayer(layer);
  }

  addLayer(layer: Layer): void {
    this.map!.addLayer(layer);
  }

  addRouteLayer(id: string): void {
    const layer: Layer = this.leafletInstance.layerGroup();
    layer.addTo(this.map!);
    this.routeLayers.set(id, layer);
  }

  addVehicleMarker(
    vehicleId: string,
    routeId: string,
    position: [number, number],
    color: string
  ): void {
    const marker = this.leafletInstance.marker(position, {
      icon: this.leafletInstance.divIcon({
        html: `<div class="vehicle-marker" style="background-color: ${color};">${routeId}</div>`,
        className: "",
        iconSize: [35, 35]
      })
    });
    this.vehicleMarkers.set(vehicleId, marker);
    const layer = this.getVehicleLayer(routeId);
    if (layer) marker.addTo(layer);
  }

  getMarker(id: string): Marker | undefined {
    return this.vehicleMarkers.get(id);
  }

  addVehicleLayer(id: string): void {
    const layer: Layer = this.leafletInstance.layerGroup();
    layer.addTo(this.map!);
    this.vehicleLayers.set(id, layer);
  }

  getVehicleLayer(id: string): Layer | undefined {
    return this.vehicleLayers.get(id);
  }
}
