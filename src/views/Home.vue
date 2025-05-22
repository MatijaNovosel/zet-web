<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { GTFSService } from "@/api/services/gtfs";
import { routeColors } from "@/constants/app";
import { busLines, nightBusLines, nightTramLines, tramLines } from "@/constants/vehicle";
import { getLineType } from "@/helpers/gtfs";
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

const initMap = () => {
  map = leafletController
    .map("map", { zoomControl: false })
    .setView([45.786002691523166, 15.951815825053787], 16);

  leafletController.maptiler
    .maptilerLayer({
      apiKey: "5Jgt1nFYAzGoT1jnqipD",
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

const getData = async () => {
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
      const routeId = vehicle.trip.routeId;
      const color = getColorByRouteId(routeId);

      const marker = leafletController.marker([position?.latitude, position?.longitude], {
        icon: leafletController.divIcon({
          html: `<div class="vehicle-marker" style="background-color: ${color};">${routeId}</div>`,
          className: "",
          iconSize: [35, 35]
        })
      });

      const layerGroup = vehicleLayerGroups[vehicle.trip.routeId];

      if (layerGroup) {
        marker.addTo(layerGroup);
      }
    }
  } finally {
    appStore.loadingData = false;
  }
};

const pollData = async () => {
  await getData();
  vehiclePollInterval = setInterval(async () => {
    await getData();
  }, 1000_0000);
};

watch(
  () => appStore.leftMenuFilters.showBus,
  (val) => {
    if (val) {
      // map.addLayer(busLayerGroup);
    } else {
      // map.removeLayer(busLayerGroup);
    }
  }
);

watch(
  () => appStore.leftMenuFilters.showTram,
  (val) => {
    if (val) {
      // map.addLayer(tramLayerGroup);
    } else {
      // map.removeLayer(tramLayerGroup);
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

onMounted(async () => {
  appStore.loading = true;
  initMap();
  [...tramLines, ...busLines, ...nightBusLines, ...nightTramLines].forEach((x) => {
    vehicleLayerGroups[x] = leafletController.layerGroup();
    vehicleLayerGroups[x].addTo(map);
  });
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
