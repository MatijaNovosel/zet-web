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
    </div>
    <v-divider />
    <div class="d-flex pl-2 py-1 ga-2">
      <v-checkbox
        v-model="appStore.leftMenuFilters.showNight"
        hide-details
        color="blue"
        density="compact"
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
            :active="appStore.leftMenuFilters.activeVehicles.has(tram)"
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
            :active="appStore.leftMenuFilters.activeVehicles.has(bus)"
            :color="routeColors[bus]"
            @click="addToFilter(bus)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { allBusLines, allTramLines, routeColors } from "@/constants/vehicle";
import { useAppStore } from "@/store/app";
import { computed } from "vue";
import { useDisplay } from "vuetify";
import FilterChip from "./FilterChip.vue";

const appStore = useAppStore();
const { mobile } = useDisplay();

const addToFilter = (value: string) => {
  appStore.addToVehicleFilter(value);
};

const filtersStyle = computed(() => ({
  height: mobile.value ? "" : "calc(100% - 104px)"
}));

const allTramsShowing = computed(() => {
  return allTramLines.every((x) => appStore.leftMenuFilters.activeVehicles.has(x));
});

const allBusesShowing = computed(() => {
  return allBusLines.every((x) => appStore.leftMenuFilters.activeVehicles.has(x));
});

const toggleBuses = () => {
  if (allBusesShowing.value) {
    allBusLines.forEach((x) => appStore.leftMenuFilters.activeVehicles.delete(x));
  } else {
    allBusLines.forEach((x) => {
      appStore.leftMenuFilters.activeVehicles.add(x);
    });
  }
};

const toggleTrams = () => {
  if (allTramsShowing.value) {
    allTramLines.forEach((x) => appStore.leftMenuFilters.activeVehicles.delete(x));
  } else {
    allTramLines.forEach((x) => {
      appStore.leftMenuFilters.activeVehicles.add(x);
    });
  }
};

const goToCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      appStore.moveToCurrentLocation([position.coords.latitude, position.coords.longitude]);
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
