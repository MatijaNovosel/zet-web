<template>
  <div
    v-if="!drawer"
    class="toolbar"
  >
    <div class="toolbar_title">
      {{ menuTitle }}
    </div>
    <div class="toolbar_separator" />
    <div class="toolbar_actions">
      <v-icon
        class="ml-2"
        size="20"
        color="blue-lighten-1"
        @click="goToLocation"
      >
        mdi-crosshairs-gps
      </v-icon>
      <v-icon
        class="ml-2"
        size="22"
        color="grey"
        @click="closeMenu"
      >
        mdi-close
      </v-icon>
      <v-icon
        v-if="appStore.activeVehicle"
        class="ml-2"
        size="22"
        :color="appStore.trackingVehicle ? 'red' : 'grey'"
        @click="appStore.trackingVehicle = !appStore.trackingVehicle"
      >
        mdi-cctv
      </v-icon>
      <v-icon
        class="ml-2"
        size="22"
        @click="drawer = !drawer"
      >
        mdi-menu
      </v-icon>
    </div>
  </div>
  <v-navigation-drawer
    :order="1"
    v-model="drawer"
    mobile
    location="right"
  >
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
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { IMapService } from "@/api/interfaces/map";
import { getService, Types } from "@/di-container";
import { useAppStore } from "@/store/app";
import { computed, ref, watch } from "vue";

const appStore = useAppStore();

const drawer = ref(false);

const mapService = getService<IMapService>(Types.MapService);

const goToLocation = () => {
  if (appStore.activeVehicle) {
    mapService.goToVehicleLocation(appStore.activeVehicle.vehicle.id);
  } else if (appStore.activeStop) {
    mapService.goToStopLocation(appStore.activeStop.stopId);
  }
};

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
.toolbar {
  flex-wrap: nowrap;
  position: absolute;
  z-index: 9999;
  bottom: 12px;
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  align-items: center;
  background-color: white;
  justify-content: center;
  border-radius: 6px;
  box-shadow: #64646f33 0px 7px 29px 0px;

  &_title {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    font-size: 12px;
    white-space: nowrap;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &_separator {
    width: 1px;
    align-self: stretch;
    background-color: #0000002a;
    margin-left: 4px;
  }

  &_actions {
    display: flex;
    align-items: center;
    padding: 0;
    padding: 10px 10px 10px 5px;
  }
}

.right_menu {
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

.track_vehicle_label {
  font-size: 14px;
  margin-left: 6px;
}
</style>
