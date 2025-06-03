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
  routeColors,
  tramLines
} from "@/constants/vehicle";
import { getService, Types } from "@/di-container";
import { getLineType } from "@/helpers/gtfs";
import { IGTFSEntityTripUpdateModel } from "@/models/gtfs";
import { IStopModel } from "@/models/stop";
import { IVehicleModel } from "@/models/vehicle";
import { useAppStore } from "@/store/app";
import { onMounted, onUnmounted, reactive, watch } from "vue";

interface IState {
  vehicles: IVehicleModel[];
  tripUpdates: IGTFSEntityTripUpdateModel[];
  stops: IStopModel[];
}

const appStore = useAppStore();

const gtfsService = getService<IGTFSService>(Types.GtfsService);
const routeService = getService<IRouteService>(Types.RouteService);
const mapService = getService<IMapService>(Types.MapService);
const stopsService = getService<IStopsService>(Types.StopsService);

const state = reactive<IState>({
  vehicles: [],
  tripUpdates: [],
  stops: []
});

let vehiclePollInterval: NodeJS.Timeout | null = null;
let currentLocationPollInterval: NodeJS.Timeout | null = null;

const getColorByRouteId = (routeId: string | undefined) => {
  if (routeId) {
    return routeColors[routeId] || routeColors.default;
  }
  return routeColors.default;
};

const getData = async () => {
  try {
    appStore.loadingData = true;

    const data = await gtfsService.getData();
    const vehicles = data.entity.filter((x) => "vehicle" in x);
    const tripUpdates = data.entity.filter((x) => "tripUpdate" in x).map((x) => x.tripUpdate!);

    state.tripUpdates = tripUpdates;

    state.vehicles = vehicles.map((x) => ({
      ...x.vehicle!,
      type: getLineType(x.vehicle!.trip.routeId)
    }));

    for (const vehicle of state.vehicles) {
      const position = vehicle.position;
      const routeId = vehicle.trip.routeId;
      const color = getColorByRouteId(routeId);
      const marker = mapService.getMarker(vehicle.vehicle.id);

      if (!marker) {
        mapService.addVehicleMarker(
          vehicle.vehicle.id,
          routeId,
          [position.latitude, position.longitude],
          color
        );
      } else {
        if (marker) {
          mapService.animateMarkerToCoords(marker, [position.latitude, position.longitude]);
          mapService.rotateMarker(
            marker,
            [position.latitude, position.longitude],
            routeId,
            color,
            vehicle.vehicle.id
          );
        }
      }
      mapService.updateVisibleMarkers();
    }

    const activeVehicleIds = state.vehicles.map((x) => x.vehicle.id);

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

const pollCurrentLocation = () => {
  currentLocationPollInterval = setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        mapService.updateCurrentLocation([coords.latitude, coords.longitude]);
      },
      () => {
        //
      }
    );
  }, 5000);
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
  () => appStore.leftMenuFilters.activeVehicles,
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
  () => appStore.currentLocationTrigger,
  (val) => {
    mapService.goToLocation(val);
  }
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

onMounted(async () => {
  appStore.loading = true;
  mapService.createMap();
  createLayers();
  await getStops();
  await pollData();
  pollCurrentLocation();
  mapService.updateVisibleMarkers();
  appStore.loading = false;
});

onUnmounted(() => {
  if (vehiclePollInterval) {
    clearInterval(vehiclePollInterval);
  }
  if (vehiclePollInterval) {
    clearInterval(vehiclePollInterval);
  }
});
</script>
