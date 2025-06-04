<template>
  <div class="right_menu elevation-2">
    <div class="right_menu_toolbar">
      <div class="right_menu_toolbar_leading">
        <div class="right_menu_toolbar_leading_action">
          <v-btn
            class="mr-3"
            icon
            flat
            variant="text"
            size="30px"
            color="blue"
            @click="goToLocation"
          >
            <v-icon> mdi-crosshairs-gps </v-icon>
          </v-btn>
        </div>
        <div class="right_menu_toolbar_leading_text">
          <div class="right_menu_toolbar_leading_text_title">
            {{ menuTitle }}
          </div>
          <div class="right_menu_toolbar_leading_text_subtitle">
            {{ menuSubtitle }}
          </div>
        </div>
      </div>
      <v-btn
        icon="mdi-close"
        variant="text"
        size="40px"
        color="black"
        @click="closeMenu"
      />
    </div>
    <v-divider />
    <div
      v-if="appStore.activeVehicle"
      class="flex-column justify-center pl-5 py-2"
    >
      <v-checkbox
        hide-details
        density="compact"
        color="blue"
        v-model="appStore.trackingVehicle"
      >
        <template #label>
          <div class="track_vehicle_label">Prati vozilo</div>
        </template>
      </v-checkbox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IMapService } from "@/api/interfaces/map";
import { getService, Types } from "@/di-container";
import { useAppStore } from "@/store/app";
import { computed, watch } from "vue";

const appStore = useAppStore();
const mapService = getService<IMapService>(Types.MapService);

const menuTitle = computed(() => {
  if (appStore.activeVehicle) {
    return `Vozilo ${appStore.activeVehicle.vehicle.id}`;
  } else if (appStore.activeStop) {
    return appStore.activeStop.stopName;
  }
});

const menuSubtitle = computed(() => {
  if (appStore.activeVehicle) {
    return `Ruta ${appStore.activeVehicle.trip.routeId}`;
  } else if (appStore.activeStop) {
    return appStore.activeStop.stopId;
  }
});

const closeMenu = () => {
  if (appStore.activeVehicle) {
    appStore.setActiveVehicle(null);
    mapService.removeActiveVehicle();
    if (appStore.trackingVehicle) {
      mapService.stopTrackingVehicle();
    }
  }

  appStore.setActiveStop(null);
};

const goToLocation = () => {
  if (appStore.activeVehicle) {
    mapService.goToVehicleLocation(appStore.activeVehicle.vehicle.id);
  } else if (appStore.activeStop) {
    mapService.goToStopLocation(appStore.activeStop.stopId);
  }
};

watch(
  () => appStore.trackingVehicle,
  (val) => {
    if (val) {
      mapService.trackVehicle(appStore.activeVehicle!);
    } else {
      mapService.stopTrackingVehicle();
    }
  }
);
</script>

<style lang="scss" scoped>
.track_vehicle_label {
  font-size: 14px;
  margin-left: 6px;
}

.right_menu {
  position: absolute;
  background-color: white;
  z-index: 999;
  top: 25px;
  right: 25px;
  width: 300px;
  border-radius: 8px;
  max-height: calc(100% - 50px);

  &_toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px 5px 15px;

    &_leading {
      display: flex;
      align-items: center;

      &_text {
        &_title {
          font-size: 14px;
          font-weight: bold;
        }

        &_subtitle {
          font-size: 12px;
          color: #3b3838be;
        }
      }
    }
  }
}
</style>
