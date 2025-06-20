<template>
  <div class="right_menu elevation-2">
    <div class="right_menu_toolbar">
      <div class="right_menu_toolbar_leading">
        <v-btn
          v-if="appStore.activeStop"
          class="mr-5"
          icon
          flat
          variant="text"
          size="30px"
          color="blue"
          @click="goToLocation"
        >
          <v-icon> mdi-crosshairs-gps </v-icon>
        </v-btn>
        <div
          v-if="appStore.activeVehicle"
          class="right_menu_toolbar_leading_vehicle_circle"
          :style="{
            backgroundColor: getColorByRouteId(appStore.activeVehicle.trip.routeId)
          }"
        >
          {{ appStore.activeVehicle.trip.routeId }}
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
      class="d-flex align-center justify-space-between pl-4 py-2"
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
      <v-btn
        class="mr-5"
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
    <stop-arrivals-list />
  </div>
</template>

<script lang="ts" setup>
import { IMapService } from "@/api/interfaces/map";
import { getService, Types } from "@/di-container";
import { getColorByRouteId } from "@/helpers/misc";
import { useAppStore } from "@/store/app";
import { computed, watch } from "vue";
import StopArrivalsList from "./StopArrivalsList.vue";

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
  width: 350px;
  border-radius: 8px;
  max-height: calc(100% - 50px);
  overflow: auto;

  &_stop {
    &_arrival_header {
      font-size: 12px;
      color: #c7b1b1;
      padding-left: 10px;
      padding-top: 10px;
    }

    &_arrivals {
      display: flex;
      flex-direction: column;

      &_not_found {
        font-size: 14px;
        color: #887171;
        margin: 20px auto;
      }

      &_item {
        border-top: 1px solid #8080801c;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 15px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;

        &:first-child {
          border-top: none;
        }

        &:nth-child(even) {
          background-color: rgba(128, 128, 128, 0.062);
        }

        &_route {
          border-radius: 50%;
          margin-right: 15px;
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: bold;
          color: white;
        }

        &_times {
          width: 100px;
          display: flex;
          align-items: start;
          flex-direction: column;

          &_calculated {
            font-size: 12px;
          }

          &_scheduled {
            font-size: 12px;
            color: #c2a3a3;
          }
        }
      }
    }
  }

  &_toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px 5px 15px;

    &_leading {
      display: flex;
      align-items: center;

      &_vehicle_circle {
        border-radius: 50%;
        margin-right: 15px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        font-weight: bold;
        color: white;
      }

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
