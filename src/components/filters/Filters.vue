<template>
  <div
    class="filters"
    :style="filtersStyle"
  >
    <div class="d-flex justify-center my-2">
      <v-btn
        icon
        flat
        variant="text"
        size="30px"
        :color="allBusesShowing ? 'blue' : 'grey'"
        :disabled="shouldDisableControls"
        @click="toggleBuses"
      >
        <v-tooltip activator="parent"> Prikaži autobuse </v-tooltip>
        <v-icon> mdi-bus </v-icon>
      </v-btn>
      <v-btn
        class="ml-3"
        icon
        flat
        variant="text"
        size="30px"
        :color="allTramsShowing ? 'blue' : 'grey'"
        :disabled="shouldDisableControls"
        @click="toggleTrams"
      >
        <v-tooltip activator="parent"> Prikaži tramvaje </v-tooltip>
        <v-icon> mdi-tram </v-icon>
      </v-btn>
      <v-btn
        class="ml-3"
        icon
        flat
        variant="text"
        size="30px"
        color="blue"
        @click="goToCurrentLocation"
      >
        <v-tooltip activator="parent"> Idi na moju lokaciju </v-tooltip>
        <v-icon> mdi-crosshairs-gps </v-icon>
      </v-btn>
      <v-btn
        class="ml-3"
        icon
        flat
        variant="text"
        size="30px"
        :color="filtersActive ? 'blue-lighten-1' : 'grey'"
        :disabled="shouldDisableControls"
        @click="clearFilters"
      >
        <v-tooltip activator="parent"> Ukloni filtriranje </v-tooltip>
        <v-icon> mdi-filter-remove </v-icon>
      </v-btn>
    </div>
    <v-divider />
    <div class="d-flex pl-2 py-1 ga-2">
      <v-checkbox
        v-model="appStore.leftMenuFilters.showNight"
        hide-details
        color="blue"
        density="compact"
        :disabled="shouldDisableControls"
      >
        <template #label>
          <div class="route_display_label">Noćne linije</div>
        </template>
      </v-checkbox>
      <v-checkbox
        v-model="appStore.leftMenuFilters.satelliteMap"
        hide-details
        color="blue"
        density="compact"
      >
        <template #label>
          <div class="route_display_label">Satelitska mapa</div>
        </template>
      </v-checkbox>
    </div>
    <v-divider />
    <div class="vehicle_filters">
      <div class="flex-column justify-center my-2 pb-1">
        <div class="text-caption pl-2 text-grey-darken-2">Tramvaji</div>
        <div class="d-flex ga-2 flex-wrap pl-2 mt-2">
          <filter-chip
            v-for="tram in appStore.tramsToDisplay"
            :key="tram"
            :text="tram"
            :active="appStore.leftMenuFilters.activeRoutes.has(tram)"
            :color="routeColors[tram]"
            @click="addToFilter(tram)"
          />
        </div>
      </div>
      <v-divider />
      <div class="flex-column column justify-center my-2">
        <div class="text-caption pl-2 text-grey-darken-2">Autobusi</div>
        <div class="d-flex ga-2 flex-wrap pl-2 mt-2">
          <filter-chip
            v-for="bus in appStore.busesToDisplay"
            :key="bus"
            :text="bus"
            :active="appStore.leftMenuFilters.activeRoutes.has(bus)"
            :color="routeColors[bus]"
            @click="addToFilter(bus)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IMapService } from "@/api/interfaces/map";
import { allBusLines, allTramLines, routeColors } from "@/constants/vehicle";
import { getService, Types } from "@/di-container";
import { useAppStore } from "@/store/app";
import { computed } from "vue";
import { useDisplay } from "vuetify";
import FilterChip from "./FilterChip.vue";

const appStore = useAppStore();
const { mobile } = useDisplay();
const mapService = getService<IMapService>(Types.MapService);

const addToFilter = (value: string) => {
  if (!appStore.activeVehicle) {
    appStore.addToRoutesFilter(value);
  }
};

const filtersStyle = computed(() => ({
  height: mobile.value ? "" : "calc(100% - 104px)"
}));

const allTramsShowing = computed(() => {
  return allTramLines.every((x) => appStore.leftMenuFilters.activeRoutes.has(x));
});

const allBusesShowing = computed(() => {
  return allBusLines.every((x) => appStore.leftMenuFilters.activeRoutes.has(x));
});

const filtersActive = computed(() => {
  return appStore.leftMenuFilters.activeRoutes.size;
});

const clearFilters = () => {
  appStore.leftMenuFilters.activeRoutes.clear();
};

const shouldDisableControls = computed(() => {
  return appStore.activeVehicle !== null;
});

const toggleBuses = () => {
  if (allBusesShowing.value) {
    allBusLines.forEach((x) => appStore.leftMenuFilters.activeRoutes.delete(x));
  } else {
    allBusLines.forEach((x) => {
      appStore.leftMenuFilters.activeRoutes.add(x);
    });
  }
};

const toggleTrams = () => {
  if (allTramsShowing.value) {
    allTramLines.forEach((x) => appStore.leftMenuFilters.activeRoutes.delete(x));
  } else {
    allTramLines.forEach((x) => {
      appStore.leftMenuFilters.activeRoutes.add(x);
    });
  }
};

const goToCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      mapService.goToLocation([position.coords.latitude, position.coords.longitude]);
    },
    () => {
      //
    }
  );
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.route_display_label {
  font-size: 14px;
  margin-bottom: 1px;
}

.vehicle_filters {
  display: flex;
  flex-direction: column;
}
</style>
