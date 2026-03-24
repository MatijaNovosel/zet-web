<template>
  <div class="toolbar">
    <div class="toolbar_title">
      <div
        v-if="appStore.activeVehicle"
        class="toolbar_title_vehicle_circle"
        :style="{
          backgroundColor: getColorByRouteId(appStore.activeVehicle.route_id)
        }"
      >
        {{ appStore.activeVehicle.route_id }}
      </div>
      <div class="toolbar_title_text">
        {{ menuTitle }}
      </div>
      <div
        v-if="appStore.activeStop"
        class="toolbar_title_route_list ml-2"
      >
        <div
          v-for="(route, i) in stopRoutes"
          class="toolbar_title_route_list_item"
          :key="i"
          :style="{
            backgroundColor: getColorByRouteId(Number(route))
          }"
        >
          {{ route }}
        </div>
      </div>
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
        color="grey"
        @click="shareVehicle"
      >
        mdi-share
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
    class="right_drawer"
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
    <stop-arrivals-list />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { IMapService } from "@/api/interfaces/map";
import { useNotifications } from "@/composables/useNotifications";
import { WEB_URL } from "@/constants/app";
import { getService, Types } from "@/di-container";
import { getColorByRouteId } from "@/helpers/misc";
import { useAppStore } from "@/store/app";
import { computed, ref, watch } from "vue";
import StopArrivalsList from "./StopArrivalsList.vue";

const appStore = useAppStore();

const drawer = ref(false);

const notify = useNotifications();

const mapService = getService<IMapService>(Types.MapService);

const goToLocation = () => {
  if (appStore.activeVehicle) {
    mapService.goToVehicleLocation(appStore.activeVehicle.id);
  } else if (appStore.activeStop) {
    mapService.goToStopLocation(appStore.activeStop.stopId);
  }
};

const stopRoutes = computed(() => {
  if (appStore.activeStop) {
    return new Set(appStore.stopArrivals.map((x) => x.routeId));
  }
  return [];
});

const menuTitle = computed(() => {
  if (appStore.activeVehicle) {
    return `Vozilo ${appStore.activeVehicle.id}`;
  } else if (appStore.activeStop) {
    return appStore.activeStop.stopName;
  }
});

const menuSubtitle = computed(() => {
  if (appStore.activeVehicle) {
    return `Ruta ${appStore.activeVehicle.route_id}`;
  } else if (appStore.activeStop) {
    return appStore.activeStop.stopId;
  }
});

const shareVehicle = () => {
  navigator.clipboard.writeText(`${WEB_URL}${appStore.activeVehicle?.id}`);
  notify.alert({
    text: "Vehicle copied to clipboard",
    type: "success"
  });
};

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
.right_drawer {
  background-color: #1d232a;
  color: white;
}

.toolbar {
  flex-wrap: nowrap;
  position: absolute;
  z-index: 500;
  bottom: calc(24px + var(--safe-area-inset-bottom));
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  align-items: center;
  background-color: #1d232a;
  justify-content: center;
  color: white;
  border-radius: 6px;
  box-shadow: #64646f33 0px 7px 29px 0px;

  &_title {
    padding: 5px 15px;
    display: flex;
    align-items: center;
    white-space: nowrap;

    &_route_list {
      display: flex;
      gap: 4px;

      &_item {
        border-radius: 50%;
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 6px;
        font-weight: bold;
        color: white;
      }
    }

    &_text {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &_vehicle_circle {
      border-radius: 50%;
      margin-right: 10px;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      color: white;
    }
  }

  &_separator {
    width: 1px;
    align-self: stretch;
    background-color: rgba(255, 255, 255, 0.219);
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
          color: #dac0c0be;
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
