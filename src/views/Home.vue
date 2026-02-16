<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { IGTFSService } from "@/api/interfaces/gtfs";
import { IMapService } from "@/api/interfaces/map";
import { IRouteService } from "@/api/interfaces/route";
import { IStopsService } from "@/api/interfaces/stops";
import { MapTypeEnum, POLLING_DURATION } from "@/constants/app";
import {
  allBusLines,
  allTramLines,
  busLines,
  nightBusLines,
  nightTramLines,
  tramLines
} from "@/constants/vehicle";
import { getService, Types } from "@/di-container";
import { getLineType } from "@/helpers/gtfs";
import { IBajsStopModel, IStopModel } from "@/models/stop";
import { IVehicleModel } from "@/models/vehicle";
import { useAppStore } from "@/store/app";
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { onMounted, onUnmounted, reactive, watch } from "vue";
import { useRouter } from "vue-router";

interface IState {
  vehicles: IVehicleModel[];
  stops: IStopModel[];
  bajsStops: IBajsStopModel[];
}

const appStore = useAppStore();
const router = useRouter();

const gtfsService = getService<IGTFSService>(Types.GtfsService);
const routeService = getService<IRouteService>(Types.RouteService);
const mapService = getService<IMapService>(Types.MapService);
const stopsService = getService<IStopsService>(Types.StopsService);

const state = reactive<IState>({
  vehicles: [],
  stops: [],
  bajsStops: []
});

let vehiclePollInterval: NodeJS.Timeout | null = null;
let currentLocationPollInterval: NodeJS.Timeout | null = null;

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
      } else {
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
  } finally {
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
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          mapService.updateCurrentLocation([coords.latitude, coords.longitude]);
        },
        () => {
          //
        }
      );
    }
  }, 5000);
};

const addBlogLink = () => {
  const leafletControlDiv = document.getElementsByClassName("leaflet-control-attribution")[0];
  if (leafletControlDiv) {
    leafletControlDiv.innerHTML += ` | <a href="https://zet-uzivo.com/blog">Blog</a>`;
  }
};

watch(
  () => appStore.activeStop,
  (val) => {
    if (!val) {
      mapService.removeActiveStopMarker();
    }
  }
);

watch(
  () => appStore.leftMenuFilters.showNight,
  (val) => {
    [...nightBusLines, ...nightTramLines].forEach((id) => {
      const layer = mapService.getVehicleLayer(id);
      if (layer) {
        if (val) mapService.addLayer(layer);
        else mapService.removeLayer(layer);
      }
    });
  }
);

watch(
  () => appStore.leftMenuFilters.activeRoutes,
  async (val) => {
    const allRoutes = [...allTramLines, ...allBusLines];
    allRoutes.forEach((id) => {
      const vehicleLayer = mapService.getVehicleLayer(id);
      const routeLayer = mapService.getRouteLayer(id);
      if (vehicleLayer) mapService.removeLayer(vehicleLayer);
      if (routeLayer) mapService.removeLayer(routeLayer);
    });

    if (val.size) {
      for (const routeId of val) {
        const vehicleLayer = mapService.getVehicleLayer(routeId);
        if (vehicleLayer) mapService.addLayer(vehicleLayer);
        const existingRouteLayer = mapService.getRouteLayer(routeId);
        if (existingRouteLayer && existingRouteLayer.getLayers().length) {
          mapService.addLayer(existingRouteLayer);
        } else {
          const data = await routeService.getRouteGeography(routeId);
          mapService.addRouteGeography(routeId, data);
        }
      }
    } else {
      allRoutes.forEach((id) => {
        const vehicleLayer = mapService.getVehicleLayer(id);
        if (vehicleLayer) mapService.addLayer(vehicleLayer);
        const routeLayer = mapService.getRouteLayer(id);
        if (routeLayer) mapService.removeLayer(routeLayer);
      });
    }
  },
  { deep: true }
);

watch(
  () => appStore.leftMenuFilters.satelliteMap,
  (val) => {
    if (val) {
      mapService.changeMapType(MapTypeEnum.Satellite);
    } else {
      mapService.changeMapType(MapTypeEnum.Street);
    }
  }
);

watch(
  () => appStore.leftMenuFilters.bajsStops,
  () => {
    mapService.toggleBajsStops();
  },
  {
    immediate: true
  }
);

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
    addBlogLink();
  } finally {
    appStore.loading = false;
  }
});

onUnmounted(() => {
  if (vehiclePollInterval) clearInterval(vehiclePollInterval);
  if (currentLocationPollInterval) clearInterval(currentLocationPollInterval);
});
</script>
