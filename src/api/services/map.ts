import { DEFAULT_LOCATION, MapTypeEnum, POLLING_DURATION } from "@/constants/app";
import { routeColors } from "@/constants/vehicle";
import { darkenHexColor, getColorByRouteId } from "@/helpers/misc";
import { IBajsStopModel, IStopModel } from "@/models/stop";
import { IVehicleModel } from "@/models/vehicle";
import { useAppStore } from "@/store/app";
import {
  divIcon,
  geoJSON,
  icon,
  latLng,
  LatLngBounds,
  layerGroup,
  LayerGroup,
  Map as LeafletMap,
  map,
  marker,
  Marker,
  point,
  TileLayer,
  tileLayer
} from "leaflet";
import { IMapService } from "./../interfaces/map";

export class MapService implements IMapService {
  map: LeafletMap | null = null;
  appStore: ReturnType<typeof useAppStore> | null = null;
  currentLocationMarker: Marker | null = null;
  activeStopMarker: Marker | null = null;
  // Bajs
  bajsStopMarkers: Map<number, Marker> = new Map();
  bajsStopInfo: Map<number, IBajsStopModel> = new Map();
  bajsLayer: LayerGroup | null = null;
  // Stops
  stopMarkers: Map<string, Marker> = new Map();
  stopInfo: Map<string, IStopModel> = new Map();
  vehicleMarkers: Map<number, Marker> = new Map();
  routeLinestrings: Map<string, Marker> = new Map();
  vehicleLayers: Map<number, LayerGroup> = new Map();
  stopLayer: LayerGroup | null = null;
  routeLayers: Map<number, LayerGroup> = new Map();
  // Relacija vehicleId -> routeId
  vehicleRouteMap: Map<number, number> = new Map();
  tileLayer: TileLayer | null = null;
  followMarkerInterval: NodeJS.Timeout | null = null;

  changeMapType(type: number): void {
    let style = "";
    let attribution = "";

    switch (type) {
      case MapTypeEnum.Satellite:
        style =
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
        attribution = "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics";
        break;
      case MapTypeEnum.Street:
      default:
        style = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        attribution = "© OpenStreetMap contributors";
        break;
    }

    this.tileLayer?.setUrl(style);
    this.tileLayer!.options.attribution = attribution;
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

  private buildVehicleIcon(vehicle: IVehicleModel, isActive: boolean) {
    const color = getColorByRouteId(vehicle.route_id);
    const arrowColor = darkenHexColor(color, 15);

    return divIcon({
      html: `
      <div class="vehicle-marker ${isActive ? "active" : ""}">
        <div class="vehicle-marker-text" style="background-color: ${color};">
          ${vehicle.route_id}
        </div>
        <div class="vehicle-marker-rotation" style="transform: rotate(${vehicle.rotation_deg}deg)">
          <div class="vehicle-marker-rotation-arrow" style="border-bottom: 12px solid ${arrowColor};"></div>
        </div>
      </div>
    `,
      className: "",
      iconSize: [35, 35]
    });
  }

  _updateMarkerVisibility = (bounds: LatLngBounds, marker: Marker) => {
    const latlng = marker.getLatLng();
    const isVisible = bounds.contains(latlng);
    if (isVisible) marker.addTo(this.map!);
    else marker.removeFrom(this.map!);
  };

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

      if (isVisible && !isInLayer) marker.addTo(layer);
      else if (!isVisible && isInLayer) layer.removeLayer(marker);
    });

    if (this.appStore?.leftMenuFilters.bajsStops) {
      this.bajsStopMarkers.forEach((marker) => {
        this._updateMarkerVisibility(bounds, marker);
      });
    }

    if (this.map.getZoom() >= 15.5) {
      this.map.addLayer(this.stopLayer!);
      this.stopMarkers.forEach((marker) => {
        this._updateMarkerVisibility(bounds, marker);
      });
    } else {
      this.map.removeLayer(this.stopLayer!);
    }
  }

  createMap(): void {
    this.map = map("map", {
      zoomControl: false,
      center: latLng(DEFAULT_LOCATION[0], DEFAULT_LOCATION[1]),
      zoom: 15
    });

    this.tileLayer = tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19
    });

    this.tileLayer!.addTo(this.map!);

    this.map!.on("moveend zoomend", () => this.updateVisibleMarkers());
    this.stopLayer = layerGroup();
    this.bajsLayer = layerGroup();

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
    this.appStore = useAppStore();
  }

  goToLocation(coords: [number, number], animate = true): void {
    const center = this.map!.getCenter();
    const target = latLng(coords[0], coords[1]);

    const distance = this.map!.distance(center, target);

    if (distance < 3) return;

    this.map!.flyTo(coords, 18, {
      animate,
      duration: 0.5
    });
  }

  updateMarkerCoords(marker: Marker, coords: [number, number]): void {
    throw new Error("Method not implemented.");
  }

  removeVehicleMarker(marker: Marker, vehicleId: number): void {
    marker.remove();
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

  rotateVehicleMarker(marker: Marker, vehicle: IVehicleModel): void {
    const isActive = this.appStore?.activeVehicle?.id === vehicle.id;
    marker.setIcon(this.buildVehicleIcon(vehicle, isActive));
  }

  removeLayer(layer: LayerGroup): void {
    this.map!.removeLayer(layer);
  }

  addLayer(layer: LayerGroup): void {
    this.map!.addLayer(layer);
  }

  getRouteLayer(id: number): LayerGroup | undefined {
    return this.routeLayers.get(id);
  }

  hideAllRoutes(): void {
    //
  }

  addRouteGeography(id: number, geography: any): void {
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

  private getMap(): LeafletMap {
    if (!this.map) throw new Error("Map not initialized");
    return this.map;
  }

  addRouteLayer(id: number): void {
    if (this.routeLayers.has(id)) return;
    const layer = layerGroup().addTo(this.getMap());
    this.routeLayers.set(id, layer);
  }

  private onVehicleClick(vehicle: IVehicleModel, marker: Marker) {
    if (!this.appStore) return;

    this.appStore.leftMenuFilters.activeRoutes.clear();

    if (!this.appStore.leftMenuFilters.activeRoutes.has(vehicle.route_id)) {
      this.appStore.addToRoutesFilter(vehicle.route_id);
    }

    this.appStore.setActiveVehicle(vehicle);
    this.appStore.setActiveStop(null);
    this.appStore.trackingVehicle = false;

    const { lat, lng } = marker.getLatLng();
    this.goToLocation([lat, lng]);
  }

  addVehicleMarker(vehicle: IVehicleModel): void {
    const isActive = this.appStore?.activeVehicle?.id === vehicle.id;
    const newMarker = marker([vehicle.position_lat, vehicle.position_long], {
      icon: this.buildVehicleIcon(vehicle, isActive)
    });

    (newMarker as any).data = vehicle;
    newMarker.on("click", () => this.onVehicleClick(vehicle, newMarker));

    this.vehicleMarkers.set(vehicle.id, newMarker);
    this.vehicleRouteMap.set(vehicle.id, vehicle.route_id);

    const layer = this.getVehicleLayer(vehicle.route_id);
    if (layer && this.isInViewport([vehicle.position_lat, vehicle.position_long])) {
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

    newMarker.addEventListener("click", async () => {
      if (!this.appStore!.activeStop) {
        this.activeStopMarker?.addTo(this.map!);
      }

      this.activeStopMarker!.setLatLng([stop.stopLat, stop.stopLon]);
      this.appStore!.setActiveStop(stop);
      this.appStore!.setActiveVehicle(null);
      this.removeActiveVehicle();

      if (this.appStore!.trackingVehicle) {
        this.stopTrackingVehicle();
      }

      this.goToLocation([stop.stopLat, stop.stopLon]);
    });

    this.stopMarkers.set(stop.stopId, newMarker);
    this.stopInfo.set(stop.stopId, stop);

    newMarker.addTo(this.stopLayer!);
  }

  getMarker(id: number): Marker | undefined {
    return this.vehicleMarkers.get(id);
  }

  addVehicleLayer(id: number): void {
    const layer = layerGroup();
    layer.addTo(this.map!);
    this.vehicleLayers.set(id, layer);
  }

  getVehicleLayer(id: number): LayerGroup | undefined {
    return this.vehicleLayers.get(id);
  }

  hasRouteGeography(id: number): boolean {
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

  getVehicleMarkers(): Map<number, Marker> {
    return this.vehicleMarkers;
  }

  trackVehicle(vehicle: IVehicleModel | number): void {
    this.stopTrackingVehicle();

    let marker: Marker | undefined;

    if (typeof vehicle === "number") {
      marker = this.vehicleMarkers.get(vehicle);
      const data = (marker as any)?.data as IVehicleModel;
      if (!data || !this.appStore) return;

      this.appStore.setActiveVehicle(data);
      this.appStore.trackingVehicle = true;

      if (!this.appStore.leftMenuFilters.activeRoutes.has(data.route_id)) {
        this.appStore.addToRoutesFilter(data.route_id);
      }
    } else {
      marker = this.vehicleMarkers.get(vehicle.id);
    }

    if (!marker) return;

    const update = () => {
      const { lat, lng } = marker!.getLatLng();
      this.goToLocation([lat, lng]);
    };

    update();
    this.followMarkerInterval = setInterval(update, 1000);
  }

  goToVehicleLocation(vehicleId: number): void {
    const marker = this.vehicleMarkers.get(vehicleId);
    if (marker) {
      this.goToLocation([marker.getLatLng().lat, marker.getLatLng().lng]);
    }
  }

  goToStopLocation(stopId: string): void {
    const marker = this.stopMarkers.get(stopId);
    if (marker) {
      this.goToLocation([marker.getLatLng().lat, marker.getLatLng().lng]);
    }
  }

  stopTrackingVehicle(): void {
    if (this.followMarkerInterval) {
      clearInterval(this.followMarkerInterval);
    }
  }

  removeActiveVehicle(): void {
    const vehicleId = this.appStore?.activeVehicle?.id;
    if (vehicleId) {
      const marker = this.vehicleMarkers.get(vehicleId);
      if (marker) {
        marker.getElement()?.classList.remove("active");
      }
    }
  }

  addBajsStopMarker(stop: IBajsStopModel): void {
    const newMarker = marker([stop.lat, stop.lng], {
      icon: icon({
        iconUrl: "/icons/bikePin.svg",
        iconSize: [48, 48]
      })
    });

    newMarker.addEventListener("click", async () => {
      this.goToLocation([stop.lat, stop.lng]);
    });

    newMarker.bindTooltip(stop.name, {
      offset: point(15, 0)
    });

    this.bajsStopMarkers.set(stop.uid, newMarker);
    this.bajsStopInfo.set(stop.uid, stop);

    newMarker.addTo(this.bajsLayer!);
  }

  toggleBajsStops(): void {
    if (!this.appStore?.leftMenuFilters.bajsStops) {
      this.map?.removeLayer(this.bajsLayer!);
    } else {
      this.map?.addLayer(this.bajsLayer!);
    }
  }
}
