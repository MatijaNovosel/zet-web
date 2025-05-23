<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { GTFSService } from "@/api/services/gtfs";
import { DEFAULT_LOCATION, MAPTILER_KEY } from "@/constants/app";
import {
  busLines,
  nightBusLines,
  nightTramLines,
  routeColors,
  tramLines
} from "@/constants/vehicle";
import { getLineType } from "@/helpers/gtfs";
import { animateMarkerMove } from "@/helpers/map";
import { Leaflet } from "@/models/common";
import { IVehicleModel } from "@/models/vehicle";
import { useAppStore } from "@/store/app";
import { onMounted, reactive, watch } from "vue";

interface IState {
  vehicles: IVehicleModel[];
}

const appStore = useAppStore();

const gtfsService = new GTFSService();

const state = reactive<IState>({
  vehicles: []
});

// @ts-ignore
const leafletController = L as Leaflet;
let map: any = null;
let vehiclePollInterval: NodeJS.Timeout | null = null;

const vehicleLayerGroups: any = {};
const routeLayerGroups: any = {};

const vehicleMarkerMap = new Map<string, any>();
const routeLinestringMap = new Map<string, any>();

const initMap = () => {
  map = leafletController.map("map", { zoomControl: false });
  map.setView(DEFAULT_LOCATION, 14);
  leafletController.maptiler
    .maptilerLayer({
      apiKey: MAPTILER_KEY,
      style: leafletController.maptiler.MapStyle.STREETS
    })
    .addTo(map);
};

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
    state.vehicles = vehicles.map((x) => ({
      ...x.vehicle!,
      type: getLineType(x.vehicle!.trip.routeId)
    }));

    for (const vehicle of state.vehicles) {
      const position = vehicle.position;

      if (initial) {
        const routeId = vehicle.trip.routeId;
        const color = getColorByRouteId(routeId);
        const marker = leafletController.marker([position?.latitude, position?.longitude], {
          icon: leafletController.divIcon({
            html: `<div class="vehicle-marker" style="background-color: ${color};">${routeId}</div>`,
            className: "",
            iconSize: [35, 35]
          })
        });

        vehicleMarkerMap.set(vehicle.vehicle.id, marker);
        const layerGroup = vehicleLayerGroups[vehicle.trip.routeId];

        if (layerGroup) {
          marker.addTo(layerGroup);
        }
      } else {
        const marker = vehicleMarkerMap.get(vehicle.vehicle.id);
        if (marker) {
          animateMarkerMove(marker, [position.latitude, position.longitude]);
        }
      }
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
  }, 8000);
};

const createLayers = () => {
  [...tramLines, ...busLines, ...nightBusLines, ...nightTramLines].forEach((x) => {
    vehicleLayerGroups[x] = leafletController.layerGroup();
    routeLayerGroups[x] = leafletController.layerGroup();
    vehicleLayerGroups[x].addTo(map);
    routeLayerGroups[x].addTo(map);
  });
};

watch(
  () => appStore.leftMenuFilters.showNight,
  (val) => {
    if (val) {
      Object.keys(vehicleLayerGroups).forEach((x) => {
        const layer = vehicleLayerGroups[x];
        if ([...nightBusLines, ...nightTramLines].includes(x)) {
          map.addLayer(layer);
        }
      });
    } else {
      Object.keys(vehicleLayerGroups).forEach((x) => {
        const layer = vehicleLayerGroups[x];
        if ([...nightBusLines, ...nightTramLines].includes(x)) {
          map.removeLayer(layer);
        }
      });
    }
  }
);

watch(
  () => appStore.leftMenuFilters.activeVehicles,
  (val) => {
    const values = [...val];

    Object.keys(vehicleLayerGroups).forEach((x) => {
      const layer = vehicleLayerGroups[x];
      map.addLayer(layer);
    });

    if (values.length) {
      Object.keys(vehicleLayerGroups).forEach((x) => {
        const layer = vehicleLayerGroups[x];
        if (!values.includes(x)) {
          map.removeLayer(layer);
        }
      });
    }
  },
  {
    deep: true
  }
);

watch(
  () => appStore.currentLocationTrigger,
  (val) => {
    map.setView(val, 14);
  }
);

onMounted(async () => {
  appStore.loading = true;
  initMap();
  createLayers();
  await pollData();
  appStore.loading = false;
});
</script>

<style lang="scss">
#map {
  height: 100%;
}

.vehicle-marker {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 15px;
  font-weight: bold;
  font-family: Roboto;
}
</style>
