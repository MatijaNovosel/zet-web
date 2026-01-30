import { DEFAULT_LOCATION, MapTypeEnum, POLLING_DURATION } from "@/constants/app";
import { routeColors } from "@/constants/vehicle";
import { darkenHexColor, getColorByRouteId } from "@/helpers/misc";
import { useAppStore } from "@/store/app";
import { divIcon, geoJSON, latLng, layerGroup, map, marker, tileLayer } from "leaflet";
export class MapService {
    map = null;
    appStore = null;
    currentLocationMarker = null;
    activeStopMarker = null;
    stopMarkers = new Map();
    stopInfo = new Map();
    vehicleMarkers = new Map();
    routeLinestrings = new Map();
    vehicleLayers = new Map();
    routeLayers = new Map();
    stopLayer = null;
    // Relacija vehicleId -> routeId
    vehicleRouteMap = new Map();
    tileLayer = null;
    followMarkerInterval = null;
    changeMapType(type) {
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
        this.tileLayer.options.attribution = attribution;
    }
    updateCurrentLocation(coords) {
        if (!this.currentLocationMarker) {
            const newMarker = marker(coords, {
                icon: divIcon({
                    className: "current-location-marker",
                    iconSize: [20, 20]
                }),
                pane: "priorityMarkers"
            });
            this.currentLocationMarker = newMarker;
            this.currentLocationMarker?.addTo(this.map);
            return;
        }
        this.currentLocationMarker.setLatLng(coords);
    }
    buildVehicleIcon(vehicle, isActive) {
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
    updateVisibleMarkers() {
        if (!this.map)
            return;
        const bounds = this.map.getBounds();
        this.vehicleMarkers.forEach((marker, vehicleId) => {
            const routeId = this.vehicleRouteMap.get(vehicleId);
            if (!routeId)
                return;
            const layer = this.vehicleLayers.get(routeId);
            if (!layer)
                return;
            const latlng = marker.getLatLng();
            const isVisible = bounds.contains(latlng);
            const isInLayer = layer.hasLayer(marker);
            if (isVisible && !isInLayer) {
                marker.addTo(layer);
            }
            else if (!isVisible && isInLayer) {
                layer.removeLayer(marker);
            }
        });
        if (this.map.getZoom() >= 15.5) {
            this.map.addLayer(this.stopLayer);
            this.stopMarkers.forEach((marker, id) => {
                const latlng = marker.getLatLng();
                const isVisible = bounds.contains(latlng);
                if (isVisible) {
                    marker.addTo(this.map);
                }
                else {
                    marker.removeFrom(this.map);
                }
            });
        }
        else {
            this.map.removeLayer(this.stopLayer);
        }
    }
    createMap() {
        this.map = map("map", {
            zoomControl: false,
            center: latLng(DEFAULT_LOCATION[0], DEFAULT_LOCATION[1]),
            zoom: 15
        });
        this.tileLayer = tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
            maxZoom: 19
        });
        this.tileLayer.addTo(this.map);
        this.map.on("moveend zoomend", () => this.updateVisibleMarkers());
        this.stopLayer = layerGroup();
        this.map.createPane("priorityMarkers");
        this.map.getPane("priorityMarkers").style.zIndex = "9999";
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
    goToLocation(coords, animate = true) {
        const center = this.map.getCenter();
        const target = latLng(coords[0], coords[1]);
        const distance = this.map.distance(center, target);
        if (distance < 3)
            return;
        this.map.flyTo(coords, 18, {
            animate,
            duration: 0.5
        });
    }
    updateMarkerCoords(marker, coords) {
        throw new Error("Method not implemented.");
    }
    removeVehicleMarker(marker, vehicleId) {
        marker.remove();
        this.vehicleMarkers.delete(vehicleId);
    }
    animateMarkerToCoords(marker, coords) {
        const startLatLng = marker.getLatLng();
        const startTime = performance.now();
        const animate = (time) => {
            const elapsed = time - startTime;
            const t = Math.min(elapsed / POLLING_DURATION, 1);
            const lat = startLatLng.lat + (coords[0] - startLatLng.lat) * t;
            const lng = startLatLng.lng + (coords[1] - startLatLng.lng) * t;
            marker.setLatLng([lat, lng]);
            if (t < 1) {
                requestAnimationFrame(animate);
            }
            else {
                this.updateVisibleMarkers();
            }
        };
        requestAnimationFrame(animate);
    }
    rotateVehicleMarker(marker, vehicle) {
        const isActive = this.appStore?.activeVehicle?.id === vehicle.id;
        marker.setIcon(this.buildVehicleIcon(vehicle, isActive));
    }
    removeLayer(layer) {
        this.map.removeLayer(layer);
    }
    addLayer(layer) {
        this.map.addLayer(layer);
    }
    getRouteLayer(id) {
        return this.routeLayers.get(id);
    }
    hideAllRoutes() {
        //
    }
    addRouteGeography(id, geography) {
        let layer = this.routeLayers.get(id);
        if (!layer) {
            layer = layerGroup();
            this.routeLayers.set(id, layer);
        }
        if (!layer.getLayers().length) {
            const routeGeoJsonLayer = geoJSON(geography, {
                style: {
                    color: routeColors[id],
                    weight: 5,
                    opacity: 0.8
                }
            });
            routeGeoJsonLayer.addTo(layer);
        }
        if (this.map && !this.map.hasLayer(layer)) {
            this.map.addLayer(layer);
        }
    }
    getMap() {
        if (!this.map)
            throw new Error("Map not initialized");
        return this.map;
    }
    addRouteLayer(id) {
        if (this.routeLayers.has(id))
            return;
        const layer = layerGroup().addTo(this.getMap());
        this.routeLayers.set(id, layer);
    }
    onVehicleClick(vehicle, marker) {
        if (!this.appStore)
            return;
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
    addVehicleMarker(vehicle) {
        const isActive = this.appStore?.activeVehicle?.id === vehicle.id;
        const newMarker = marker([vehicle.position_lat, vehicle.position_long], {
            icon: this.buildVehicleIcon(vehicle, isActive)
        });
        newMarker.data = vehicle;
        newMarker.on("click", () => this.onVehicleClick(vehicle, newMarker));
        this.vehicleMarkers.set(vehicle.id, newMarker);
        this.vehicleRouteMap.set(vehicle.id, vehicle.route_id);
        const layer = this.getVehicleLayer(vehicle.route_id);
        if (layer && this.isInViewport([vehicle.position_lat, vehicle.position_long])) {
            newMarker.addTo(layer);
        }
    }
    addStopMarker(stop) {
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
            if (!this.appStore.activeStop) {
                this.activeStopMarker?.addTo(this.map);
            }
            this.activeStopMarker.setLatLng([stop.stopLat, stop.stopLon]);
            this.appStore.setActiveStop(stop);
            this.appStore.setActiveVehicle(null);
            this.removeActiveVehicle();
            if (this.appStore.trackingVehicle) {
                this.stopTrackingVehicle();
            }
            this.goToLocation([stop.stopLat, stop.stopLon]);
        });
        this.stopMarkers.set(stop.stopId, newMarker);
        this.stopInfo.set(stop.stopId, stop);
        newMarker.addTo(this.stopLayer);
    }
    getMarker(id) {
        return this.vehicleMarkers.get(id);
    }
    addVehicleLayer(id) {
        const layer = layerGroup();
        layer.addTo(this.map);
        this.vehicleLayers.set(id, layer);
    }
    getVehicleLayer(id) {
        return this.vehicleLayers.get(id);
    }
    hasRouteGeography(id) {
        const layer = this.routeLayers.get(id);
        return !!layer && layer.getLayers().length > 0;
    }
    isInViewport(coords) {
        if (!this.map)
            return false;
        return this.map.getBounds().contains(coords);
    }
    removeActiveStopMarker() {
        this.activeStopMarker?.removeFrom(this.map);
    }
    getVehicleMarkers() {
        return this.vehicleMarkers;
    }
    trackVehicle(vehicle) {
        this.stopTrackingVehicle();
        let marker;
        if (typeof vehicle === "number") {
            marker = this.vehicleMarkers.get(vehicle);
            const data = marker?.data;
            if (!data || !this.appStore)
                return;
            this.appStore.setActiveVehicle(data);
            this.appStore.trackingVehicle = true;
            if (!this.appStore.leftMenuFilters.activeRoutes.has(data.route_id)) {
                this.appStore.addToRoutesFilter(data.route_id);
            }
        }
        else {
            marker = this.vehicleMarkers.get(vehicle.id);
        }
        if (!marker)
            return;
        const update = () => {
            const { lat, lng } = marker.getLatLng();
            this.goToLocation([lat, lng]);
        };
        update();
        this.followMarkerInterval = setInterval(update, 1000);
    }
    goToVehicleLocation(vehicleId) {
        const marker = this.vehicleMarkers.get(vehicleId);
        if (marker) {
            this.goToLocation([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
    }
    goToStopLocation(stopId) {
        const marker = this.stopMarkers.get(stopId);
        if (marker) {
            this.goToLocation([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
    }
    stopTrackingVehicle() {
        if (this.followMarkerInterval) {
            clearInterval(this.followMarkerInterval);
        }
    }
    removeActiveVehicle() {
        const vehicleId = this.appStore?.activeVehicle?.id;
        if (vehicleId) {
            const marker = this.vehicleMarkers.get(vehicleId);
            if (marker) {
                marker.getElement()?.classList.remove("active");
            }
        }
    }
}
