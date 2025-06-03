import { DEFAULT_LOCATION, MAPTILER_KEY, MapTypeEnum, POLLING_DURATION } from "@/constants/app";
import { routeColors } from "@/constants/vehicle";
import { computeHeading } from "@/helpers/map";
import { darkenHexColor } from "@/helpers/misc";
import { IStopModel } from "@/models/stop";
import { useAppStore } from "@/store/app";
import {
  divIcon,
  geoJSON,
  latLng,
  layerGroup,
  LayerGroup,
  Map as LeafletMap,
  map,
  marker,
  Marker,
  TileLayer,
  tileLayer
} from "leaflet";
import { IMapService } from "./../interfaces/map";

export class MapService implements IMapService {
  map: LeafletMap | null = null;
  appStore: any;
  currentLocationMarker: Marker | null = null;
  activeStopMarker: Marker | null = null;

  stopMarkers: Map<string, Marker> = new Map();
  stopInfo: Map<string, IStopModel> = new Map();

  vehicleMarkers: Map<string, Marker> = new Map();
  vehicleMarkerRotations: Map<string, number> = new Map();
  routeLinestrings: Map<string, Marker> = new Map();

  vehicleLayers: Map<string, LayerGroup> = new Map();
  routeLayers: Map<string, LayerGroup> = new Map();

  stopLayer: LayerGroup | null = null;

  // Relacija vehicleId -> routeId
  vehicleRouteMap: Map<string, string> = new Map();

  tileLayer: TileLayer | null = null;

  changeMapType(type: number): void {
    let style = "";
    switch (type) {
      case MapTypeEnum.Satellite:
        style = `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=${MAPTILER_KEY}`;
        break;
      case MapTypeEnum.Street:
        style = `https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}@2x.png?key=${MAPTILER_KEY}`;
        break;
    }
    this.tileLayer?.setUrl(style);
  }

  updateCurrentLocation(coords: [number, number]): void {
    if (!this.currentLocationMarker) {
      const newMarker = marker(coords, {
        icon: divIcon({
          className: "current-location-marker",
          iconSize: [20, 20]
        }),
        pane: "priorityMarkers"
      });
      this.currentLocationMarker = newMarker;
      this.currentLocationMarker?.addTo(this.map!);
      return;
    }

    this.currentLocationMarker.setLatLng(coords);
  }

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

    if (this.map.getZoom() >= 15.5) {
      this.map.addLayer(this.stopLayer!);
      this.stopMarkers.forEach((marker, id) => {
        const latlng = marker.getLatLng();
        const isVisible = bounds.contains(latlng);

        if (isVisible) {
          marker.addTo(this.map!);
        } else {
          marker.removeFrom(this.map!);
        }
      });
    } else {
      this.map.removeLayer(this.stopLayer!);
    }
  }

  createMap(): void {
    this.appStore = useAppStore();
    this.map = map("map", {
      zoomControl: false,
      center: latLng(DEFAULT_LOCATION[0], DEFAULT_LOCATION[1]),
      zoom: 14
    });

    this.tileLayer = tileLayer(
      `https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}@2x.png?key=${MAPTILER_KEY}`,
      {
        crossOrigin: true,
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1
      }
    );

    this.tileLayer!.addTo(this.map!);

    this.map!.on("moveend zoomend", () => this.updateVisibleMarkers());
    this.stopLayer = layerGroup();

    this.map!.createPane("priorityMarkers");
    this.map!.getPane("priorityMarkers")!.style.zIndex = "9999";

    const newMarker = marker([0, 0], {
      icon: divIcon({
        html: `
          <div class="stop-marker active"></div>
        `,
        className: "",
        iconSize: [35, 35]
      }),
      pane: "priorityMarkers"
    });

    this.activeStopMarker = newMarker;
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

  removeVehicleMarker(marker: Marker, vehicleId: string): void {
    marker.remove();
    this.vehicleMarkerRotations.delete(vehicleId);
    this.vehicleMarkers.delete(vehicleId);
  }

  animateMarkerToCoords(marker: Marker, coords: [number, number]): void {
    const startLatLng = marker.getLatLng();
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / POLLING_DURATION, 1);

      const lat = startLatLng.lat + (coords[0] - startLatLng.lat) * t;
      const lng = startLatLng.lng + (coords[1] - startLatLng.lng) * t;

      marker.setLatLng([lat, lng]);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        this.updateVisibleMarkers();
      }
    };

    requestAnimationFrame(animate);
  }

  rotateMarker(
    marker: Marker,
    coords: [number, number],
    routeId: string,
    color: string,
    vehicleId: string
  ): void {
    const rotation = computeHeading(
      {
        ...marker.getLatLng()
      },
      {
        lat: coords[0],
        lng: coords[1]
      }
    );

    const arrowColor = darkenHexColor(color, 15);
    const previousRotation = this.vehicleMarkerRotations.get(vehicleId);

    const newIcon = divIcon({
      html: `
          <div class="vehicle-marker">
            <div class="vehicle-marker-text" style="background-color: ${color};">
              ${routeId}
            </div>
            <div class="vehicle-marker-rotation" style="transform: rotate(${rotation}deg)">
              <div class="vehicle-marker-rotation-arrow" style="border-bottom: 12px solid ${arrowColor};"></div>
            </div>
          </div>
        `,
      className: "",
      iconSize: [35, 35]
    });

    if (previousRotation) {
      if (previousRotation !== rotation && rotation !== 0) {
        this.vehicleMarkerRotations.set(vehicleId, rotation);
        marker.setIcon(newIcon);
      }
    } else {
      this.vehicleMarkerRotations.set(vehicleId, rotation);
      marker.setIcon(newIcon);
    }
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
      layer = layerGroup();
      this.routeLayers.set(id, layer!);
    }

    if (!layer!.getLayers().length) {
      const routeGeoJsonLayer = geoJSON(geography, {
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
    const layer: LayerGroup = layerGroup();
    layer.addTo(this.map!);
    this.routeLayers.set(id, layer);
  }

  addVehicleMarker(
    vehicleId: string,
    routeId: string,
    position: [number, number],
    color: string
  ): void {
    const newMarker = marker(position, {
      icon: divIcon({
        html: `
          <div class="vehicle-marker" style="background-color: ${color};">
            <div class="vehicle-marker-text">
              ${routeId}
            </div>
            <div class="vehicle-marker-rotation">
          </div>
          </div>
        `,
        className: "",
        iconSize: [35, 35]
      })
    });

    newMarker.addEventListener("click", () => {
      this.appStore.addToVehicleFilter(routeId);
    });

    this.vehicleMarkers.set(vehicleId, newMarker);
    this.vehicleRouteMap.set(vehicleId, routeId);
    const layer = this.getVehicleLayer(routeId);

    if (layer && this.isInViewport(position)) {
      newMarker.addTo(layer);
    }
  }

  addStopMarker(stop: IStopModel): void {
    const newMarker = marker([stop.stopLat, stop.stopLon], {
      icon: divIcon({
        html: `
          <div class="stop-marker"></div>
        `,
        className: "",
        iconSize: [35, 35]
      })
    });

    newMarker.addEventListener("click", () => {
      if (!this.appStore.activeStop) {
        this.activeStopMarker?.addTo(this.map!);
      }
      this.activeStopMarker!.setLatLng([stop.stopLat, stop.stopLon]);
      this.appStore.setActiveStop(stop);
      this.goToLocation([stop.stopLat, stop.stopLon]);
    });

    this.stopMarkers.set(stop.stopId, newMarker);
    this.stopInfo.set(stop.stopId, stop);

    newMarker.addTo(this.stopLayer!);
  }

  getMarker(id: string): Marker | undefined {
    return this.vehicleMarkers.get(id);
  }

  addVehicleLayer(id: string): void {
    const layer = layerGroup();
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

  removeActiveStopMarker(): void {
    this.activeStopMarker?.removeFrom(this.map!);
  }
}
