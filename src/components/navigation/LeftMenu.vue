<template>
  <div class="left_menu elevation-2">
    <v-list-item
      title="ZET Web"
      :subtitle="version"
      class="text-subtitle-2 py-3"
    >
      <template #prepend>
        <v-progress-circular
          color="blue"
          :model-value="appStore.progress"
          class="mr-5"
        >
          <v-icon
            class="pulse"
            size="15"
          >
            mdi-timer-sand
          </v-icon>
        </v-progress-circular>
      </template>
    </v-list-item>
    <template v-if="appStore.leftMenuFilters.menuOpen">
      <v-divider />
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
      </div>
      <v-divider />
      <div class="d-flex pl-2 py-1 ga-2">
        <v-checkbox
          v-model="appStore.leftMenuFilters.showRoutes"
          hide-details
          color="blue"
          density="compact"
        >
          <template #label>
            <div class="route_display_label">Prikaži trase</div>
          </template>
        </v-checkbox>
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
      </div>
      <v-divider />
      <div class="vehicle_filters">
        <div class="flex-column justify-center my-2 pb-1">
          <div class="text-caption pl-2 text-grey-darken-2">Tramvaji</div>
          <div class="d-flex ga-2 flex-wrap pl-2 mt-2">
            <div
              v-for="tram in appStore.tramsToDisplay"
              :key="tram"
              class="line_chip"
              :style="{
                backgroundColor: appStore.leftMenuFilters.activeVehicles.has(tram)
                  ? routeColors[tram]
                  : '#e3d8d8',
                color: appStore.leftMenuFilters.activeVehicles.has(tram) ? 'white' : '#8f8181'
              }"
              @click="addToFilter(tram)"
            >
              {{ tram }}
            </div>
          </div>
        </div>
        <v-divider />
        <div class="flex-column column justify-center my-2">
          <div class="text-caption pl-2 text-grey-darken-2">Autobusi</div>
          <div class="d-flex ga-2 flex-wrap pl-2 mt-2">
            <div
              v-for="bus in appStore.busesToDisplay"
              :key="bus"
              class="line_chip"
              :style="{
                backgroundColor: appStore.leftMenuFilters.activeVehicles.has(bus)
                  ? routeColors[bus]
                  : '#e3d8d8',
                color: appStore.leftMenuFilters.activeVehicles.has(bus) ? 'white' : '#8f8181'
              }"
              @click="addToFilter(bus)"
            >
              {{ bus }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <v-divider />
    <div class="d-flex justify-center my-1">
      <v-btn
        :icon="appStore.leftMenuFilters.menuOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        flat
        variant="text"
        size="30px"
        color="black"
        @click="appStore.leftMenuFilters.menuOpen = !appStore.leftMenuFilters.menuOpen"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { routeColors } from "@/constants/app";
import { allBusLines, allTramLines } from "@/constants/vehicle";
import { useAppStore } from "@/store/app";
import { computed } from "vue";
import { version } from "../../../package.json";

const appStore = useAppStore();

const addToFilter = (value: string) => {
  if (appStore.leftMenuFilters.activeVehicles.has(value)) {
    appStore.leftMenuFilters.activeVehicles.delete(value);
  } else {
    appStore.leftMenuFilters.activeVehicles.add(value);
  }
};

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
</script>

<style lang="scss" scoped>
.left_menu {
  position: absolute;
  background-color: white;
  z-index: 999;
  top: 25px;
  left: 25px;
  width: 275px;
  border-radius: 8px;
}

.line_chip {
  min-width: 30px;
  font-size: 12px;
  border-radius: 8px;
  display: flex;
  padding: 0px 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.route_display_label {
  font-size: 14px;
  margin-bottom: 1px;
}

.vehicle_filters {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 400px;
}
</style>
