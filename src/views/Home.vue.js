/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { MapTypeEnum, POLLING_DURATION } from "@/constants/app";
import { allBusLines, allTramLines, busLines, nightBusLines, nightTramLines, tramLines } from "@/constants/vehicle";
import { getService, Types } from "@/di-container";
import { getLineType } from "@/helpers/gtfs";
import { useAppStore } from "@/store/app";
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { onMounted, onUnmounted, reactive, watch } from "vue";
import { useRouter } from "vue-router";
const appStore = useAppStore();
const router = useRouter();
const gtfsService = getService(Types.GtfsService);
const routeService = getService(Types.RouteService);
const mapService = getService(Types.MapService);
const stopsService = getService(Types.StopsService);
const state = reactive({
    vehicles: [],
    stops: [],
    bajsStops: []
});
let vehiclePollInterval = null;
let currentLocationPollInterval = null;
const getData = async () => {
    try {
        appStore.loadingData = true;
        state.vehicles = (await gtfsService.getData()).map((x) => ({
            ...x,
            type: getLineType(x.route_id)
        }));
        for (const vehicle of state.vehicles) {
            const marker = mapService.getMarker(vehicle.id);
            if (!marker) {
                mapService.addVehicleMarker(vehicle);
            }
            else {
                if (marker) {
                    mapService.animateMarkerToCoords(marker, [vehicle.position_lat, vehicle.position_long]);
                    mapService.rotateVehicleMarker(marker, vehicle);
                }
            }
            mapService.updateVisibleMarkers();
        }
        const activeVehicleIds = state.vehicles.map((x) => x.id);
        const vehicleMarkers = mapService.getVehicleMarkers();
        vehicleMarkers.forEach((marker, vehicleId) => {
            if (!activeVehicleIds.includes(vehicleId)) {
                mapService.removeVehicleMarker(marker, vehicleId);
            }
        });
    }
    finally {
        appStore.loadingData = false;
    }
};
const pollData = async () => {
    await getData();
    appStore.startProgress();
    vehiclePollInterval = setInterval(async () => {
        await getData();
        appStore.startProgress();
    }, POLLING_DURATION);
};
const createLayers = () => {
    [...tramLines, ...busLines, ...nightBusLines, ...nightTramLines].forEach((id) => {
        mapService.addVehicleLayer(id);
        mapService.addRouteLayer(id);
    });
};
const getStops = async () => {
    const data = await stopsService.getStops();
    state.stops = data;
    for (const stop of data) {
        mapService.addStopMarker(stop);
    }
};
const getBajsStops = async () => {
    const data = await stopsService.getBajsStops();
    state.bajsStops = data;
    for (const stop of data) {
        mapService.addBajsStopMarker(stop);
    }
};
const pollCurrentLocation = () => {
    currentLocationPollInterval = setInterval(async () => {
        if (Capacitor.isNativePlatform()) {
            const pos = await Geolocation.getCurrentPosition();
            mapService.updateCurrentLocation([pos.coords.latitude, pos.coords.longitude]);
        }
        else {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                mapService.updateCurrentLocation([coords.latitude, coords.longitude]);
            }, () => {
                //
            });
        }
    }, 5000);
};
watch(() => appStore.activeStop, (val) => {
    if (!val) {
        mapService.removeActiveStopMarker();
    }
});
watch(() => appStore.leftMenuFilters.showNight, (val) => {
    [...nightBusLines, ...nightTramLines].forEach((id) => {
        const layer = mapService.getVehicleLayer(id);
        if (layer) {
            if (val)
                mapService.addLayer(layer);
            else
                mapService.removeLayer(layer);
        }
    });
});
watch(() => appStore.leftMenuFilters.activeRoutes, async (val) => {
    const allRoutes = [...allTramLines, ...allBusLines];
    allRoutes.forEach((id) => {
        const vehicleLayer = mapService.getVehicleLayer(id);
        const routeLayer = mapService.getRouteLayer(id);
        if (vehicleLayer)
            mapService.removeLayer(vehicleLayer);
        if (routeLayer)
            mapService.removeLayer(routeLayer);
    });
    if (val.size) {
        for (const routeId of val) {
            const vehicleLayer = mapService.getVehicleLayer(routeId);
            if (vehicleLayer)
                mapService.addLayer(vehicleLayer);
            const existingRouteLayer = mapService.getRouteLayer(routeId);
            if (existingRouteLayer && existingRouteLayer.getLayers().length) {
                mapService.addLayer(existingRouteLayer);
            }
            else {
                const data = await routeService.getRouteGeography(routeId);
                mapService.addRouteGeography(routeId, data);
            }
        }
    }
    else {
        allRoutes.forEach((id) => {
            const vehicleLayer = mapService.getVehicleLayer(id);
            if (vehicleLayer)
                mapService.addLayer(vehicleLayer);
            const routeLayer = mapService.getRouteLayer(id);
            if (routeLayer)
                mapService.removeLayer(routeLayer);
        });
    }
}, { deep: true });
watch(() => appStore.leftMenuFilters.satelliteMap, (val) => {
    if (val) {
        mapService.changeMapType(MapTypeEnum.Satellite);
    }
    else {
        mapService.changeMapType(MapTypeEnum.Street);
    }
});
watch(() => appStore.leftMenuFilters.bajsStops, () => {
    mapService.toggleBajsStops();
}, {
    immediate: true
});
onMounted(async () => {
    try {
        appStore.loading = true;
        mapService.createMap();
        createLayers();
        await getStops();
        await getBajsStops();
        await pollData();
        pollCurrentLocation();
        mapService.updateVisibleMarkers();
        const routeId = router.currentRoute.value.params.id;
        if (routeId && routeId !== "home") {
            mapService.trackVehicle(Number(routeId));
        }
    }
    finally {
        appStore.loading = false;
    }
});
onUnmounted(() => {
    if (vehiclePollInterval)
        clearInterval(vehiclePollInterval);
    if (currentLocationPollInterval)
        clearInterval(currentLocationPollInterval);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    id: "map",
});
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
