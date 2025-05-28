<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { GTFSService } from "@/api/services/gtfs";
import { MapService } from "@/api/services/map";
import { RouteService } from "@/api/services/route";
import { POLLING_DURATION } from "@/constants/app";
import {
  allBusLines,
  allTramLines,
  busLines,
  nightBusLines,
  nightTramLines,
  routeColors,
  tramLines
} from "@/constants/vehicle";
import { getLineType } from "@/helpers/gtfs";
import { IGTFSEntityTripUpdateModel } from "@/models/gtfs";
import { IVehicleModel } from "@/models/vehicle";
import { useAppStore } from "@/store/app";
import { onMounted, reactive, watch } from "vue";

interface IState {
  vehicles: IVehicleModel[];
  tripUpdates: IGTFSEntityTripUpdateModel[];
}

const appStore = useAppStore();

const gtfsService = new GTFSService();
const routeService = new RouteService();
const mapService = new MapService();

const state = reactive<IState>({
  vehicles: [],
  tripUpdates: []
});

let vehiclePollInterval: NodeJS.Timeout | null = null;

// @ts-ignore
const leafletInstance = L as any;

const getColorByRouteId = (routeId: string | undefined) => {
  if (routeId) {
    return routeColors[routeId] || routeColors.default;
  }
  return routeColors.default;
};

const getData = async (initial?: boolean) => {
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

      if (initial) {
        mapService.addVehicleMarker(
          vehicle.vehicle.id,
          routeId,
          [position.latitude, position.longitude],
          color
        );
      } else {
        const marker = mapService.getMarker(vehicle.vehicle.id);
        if (marker) {
          mapService.animateMarkerToCoords(marker, [position.latitude, position.longitude]);
          mapService.rotateMarker(marker, [position.latitude, position.longitude], routeId, color);
        }
      }
      mapService.updateVisibleMarkers();
    }
  } finally {
    appStore.loadingData = false;
  }
};

const pollData = async () => {
  await getData(true);
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

const setAttributions = () => {
  const attributionList = document.querySelector(".leaflet-control-attribution");
  if (attributionList) {
    const link1 = document.createElement("a");
    link1.setAttribute("href", "https://github.com/knork-fork/zet-gtfs-backend");
    link1.innerText = " © LK";

    const link2 = document.createElement("a");
    link2.setAttribute("href", "https://github.com/MatijaNovosel/zet-web");
    link2.innerText = " © MN";

    attributionList.append(link1);
    attributionList.append(link2);
  }
};

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

onMounted(async () => {
  appStore.loading = true;
  mapService.createMap(leafletInstance);
  createLayers();
  await pollData();
  setTimeout(setAttributions, 2000);
  appStore.loading = false;
});
</script>
