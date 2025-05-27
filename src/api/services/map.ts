import { DEFAULT_LOCATION, MAPTILER_KEY, POLLING_DURATION } from "@/constants/app";
import { routeColors } from "@/constants/vehicle";
import { LayerGroup, Map as LeafletMap, Marker } from "leaflet";
import { IMapService } from "./../interfaces/map";

export class MapService implements IMapService {
  map: LeafletMap | null = null;

  vehicleMarkers: Map<string, Marker> = new Map();
  routeLinestrings: Map<string, Marker> = new Map();

  vehicleLayers: Map<string, LayerGroup> = new Map();
  routeLayers: Map<string, LayerGroup> = new Map();

  // Relacija vehicleId -> routeId
  vehicleRouteMap: Map<string, string> = new Map();

  leafletInstance: any;

  updateVisibleMarkers(): void {
    if (!this.map) return;

    const bounds = this.map.getBounds();

    this.vehicleMarkers.forEach((marker, vehicleId) => {
      const routeId = this.vehicleRouteMap.get(vehicleId);
      if (!routeId) return;

      const layer = this.vehicleLayers.get(routeId);
      if (!layer) return;

      const latlng = marker.getLatLng();
      const isVisible = bounds.contains(latlng);
      const isInLayer = layer.hasLayer(marker);

      if (isVisible && !isInLayer) {
        marker.addTo(layer);
      } else if (!isVisible && isInLayer) {
        layer.removeLayer(marker);
      }
    });
  }

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
    this.map!.on("moveend zoomend", () => this.updateVisibleMarkers());
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

  removeLayer(layer: LayerGroup): void {
    this.map!.removeLayer(layer);
  }

  addLayer(layer: LayerGroup): void {
    this.map!.addLayer(layer);
  }

  getRouteLayer(id: string): LayerGroup | undefined {
    return this.routeLayers.get(id);
  }

  hideAllRoutes(): void {
    //
  }

  addRouteGeography(id: string, geography: any): void {
    let layer = this.routeLayers.get(id);

    if (!layer) {
      layer = this.leafletInstance.layerGroup();
      this.routeLayers.set(id, layer!);
    }

    if (!layer!.getLayers().length) {
      const routeGeoJsonLayer = this.leafletInstance.geoJSON(geography, {
        style: {
          color: routeColors[id],
          weight: 5,
          opacity: 0.8
        }
      });
      routeGeoJsonLayer.addTo(layer);
    }

    if (this.map && !this.map.hasLayer(layer!)) {
      this.map.addLayer(layer!);
    }
  }

  addRouteLayer(id: string): void {
    const layer: LayerGroup = this.leafletInstance.layerGroup();
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
    this.vehicleRouteMap.set(vehicleId, routeId);
    const layer = this.getVehicleLayer(routeId);
    if (layer && this.isInViewport(position)) {
      marker.addTo(layer);
    }
  }

  getMarker(id: string): Marker | undefined {
    return this.vehicleMarkers.get(id);
  }

  addVehicleLayer(id: string): void {
    const layer: LayerGroup = this.leafletInstance.layerGroup();
    layer.addTo(this.map!);
    this.vehicleLayers.set(id, layer);
  }

  getVehicleLayer(id: string): LayerGroup | undefined {
    return this.vehicleLayers.get(id);
  }

  hasRouteGeography(id: string): boolean {
    const layer = this.routeLayers.get(id);
    return !!layer && layer.getLayers().length > 0;
  }

  isInViewport(coords: [number, number]): boolean {
    if (!this.map) return false;
    return this.map.getBounds().contains(coords);
  }
}
