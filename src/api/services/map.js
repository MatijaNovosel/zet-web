import { DEFAULT_LOCATION, MAPTILER_KEY, MapTypeEnum, POLLING_DURATION } from "@/constants/app";
import { routeColors } from "@/constants/vehicle";
import { computeHeading } from "@/helpers/map";
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
    vehicleMarkerRotations = new Map();
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
        this.tileLayer = tileLayer(`https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}@2x.png?key=${MAPTILER_KEY}`, {
            crossOrigin: true,
            tileSize: 512,
            zoomOffset: -1,
            minZoom: 1
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
        this.vehicleMarkerRotations.delete(vehicleId);
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
        const rotation = computeHeading({
            ...marker.getLatLng()
        }, {
            lat: vehicle.position.latitude,
            lng: vehicle.position.longitude
        });
        const color = getColorByRouteId(vehicle.trip.routeId);
        const arrowColor = darkenHexColor(color, 15);
        const previousRotation = this.vehicleMarkerRotations.get(vehicle.vehicle.id);
        const isActive = this.appStore?.activeVehicle?.vehicle.id === vehicle.vehicle.id;
        const newIcon = divIcon({
            html: `
          <div class="vehicle-marker ${isActive ? "active" : ""}">
            <div class="vehicle-marker-text" style="background-color: ${color};">
              ${vehicle.trip.routeId}
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
                this.vehicleMarkerRotations.set(vehicle.vehicle.id, rotation);
                marker.setIcon(newIcon);
            }
        }
        else {
            this.vehicleMarkerRotations.set(vehicle.vehicle.id, rotation);
            marker.setIcon(newIcon);
        }
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
    addRouteLayer(id) {
        const layer = layerGroup();
        layer.addTo(this.map);
        this.routeLayers.set(id, layer);
    }
    addVehicleMarker(vehicle) {
        const color = getColorByRouteId(vehicle.trip.routeId);
        const newMarker = marker([vehicle.position.latitude, vehicle.position.longitude], {
            icon: divIcon({
                html: `
          <div class="vehicle-marker" style="background-color: ${color};">
            <div class="vehicle-marker-text">
              ${vehicle.trip.routeId}
            </div>
            <div class="vehicle-marker-rotation">
          </div>
          </div>
        `,
                className: "",
                iconSize: [35, 35]
            })
        });
        // @ts-ignore
        newMarker.data = vehicle;
        newMarker.addEventListener("click", () => {
            this.appStore?.leftMenuFilters.activeRoutes.clear();
            if (!this.appStore?.leftMenuFilters.activeRoutes.has(vehicle.trip.routeId)) {
                this.appStore.addToRoutesFilter(vehicle.trip.routeId);
            }
            this.appStore?.setActiveVehicle(vehicle);
            this.appStore.setActiveStop(null);
            this.appStore.trackingVehicle = false;
            this.goToLocation([newMarker.getLatLng().lat, newMarker.getLatLng().lng]);
        });
        this.vehicleMarkers.set(vehicle.vehicle.id, newMarker);
        this.vehicleRouteMap.set(vehicle.vehicle.id, vehicle.trip.routeId);
        const layer = this.getVehicleLayer(vehicle.trip.routeId);
        if (layer && this.isInViewport([vehicle.position.latitude, vehicle.position.longitude])) {
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
        let marker = undefined;
        if (typeof vehicle === "string") {
            marker = this.vehicleMarkers.get(vehicle);
            // @ts-ignore
            const data = marker.data;
            this.appStore?.setActiveVehicle(data);
            this.appStore.trackingVehicle = true;
            if (!this.appStore?.leftMenuFilters.activeRoutes.has(data.trip.routeId)) {
                this.appStore.addToRoutesFilter(data.trip.routeId);
            }
        }
        else {
            marker = this.vehicleMarkers.get(vehicle.vehicle.id);
        }
        if (marker) {
            this.goToLocation([marker.getLatLng().lat, marker.getLatLng().lng]);
            this.followMarkerInterval = setInterval(() => {
                this.goToLocation([marker.getLatLng().lat, marker.getLatLng().lng]);
            }, 1000);
        }
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
        const vehicleId = this.appStore?.activeVehicle?.vehicle.id;
        if (vehicleId) {
            const marker = this.vehicleMarkers.get(vehicleId);
            if (marker) {
                marker.getElement()?.classList.remove("active");
            }
        }
    }
}
