<template>
  <div
    class="d-flex flex-column"
    v-if="appStore.activeStop"
  >
    <div
      v-if="appStore.stopArrivals.length"
      class="stop_arrivals"
    >
      <div
        v-for="(arrival, i) in appStore.stopArrivals"
        :key="i"
        class="stop_arrivals_item"
      >
        <div
          class="stop_arrivals_item_route"
          :style="{
            backgroundColor: getColorByRouteId(arrival.routeId),
            cursor: arrival.vehicleId ? 'pointer' : ''
          }"
          @click="goToVehicle(arrival.vehicleId)"
        >
          {{ arrival.routeId }}
          <template v-if="arrival.vehicleId">
            <div class="stop_arrivals_item_route_indicator pulse" />
            <div class="stop_arrivals_item_route_indicator" />
          </template>
        </div>
        <div class="stop_arrivals_item_times">
          <div class="stop_arrivals_item_times_calculated">
            {{ arrival.calculatedArrivalTime }} ({{
              formatArrivalTime(arrival.arrivalTimeInMinutes)
            }})
          </div>
          <div class="stop_arrivals_item_times_scheduled">
            {{ arrival.scheduledArrivalTime }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="stop_arrivals_not_found"
    >
      Stanica nema zabilježenih dolazaka!
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IMapService } from "@/api/interfaces/map";
import { getService, Types } from "@/di-container";
import { getColorByRouteId } from "@/helpers/misc";
import { useAppStore } from "@/store/app";

const appStore = useAppStore();
const mapService = getService<IMapService>(Types.MapService);

function toHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return {
    hours,
    minutes
  };
}

const formatArrivalTime = (val: number) => {
  if (val === 0) {
    return "Stiglo";
  } else if (val >= 60) {
    const { hours, minutes } = toHoursAndMinutes(val);
    return `${hours}h ${minutes}min`;
  }
  return `${val} min`;
};

const goToVehicle = (vehicleId: number | null) => {
  if (vehicleId) {
    mapService.goToVehicleLocation(vehicleId.toString());
  }
};
</script>

<style lang="scss" scoped>
.stop {
  &_arrivals {
    overflow: auto;
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
      align-items: center;
      padding-left: 15px;
      padding-right: 10px;
      padding-top: 5px;
      padding-bottom: 5px;

      &:first-child {
        border-top: none;
      }

      &_route {
        border-radius: 50%;
        margin-right: 15px;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        color: white;
        position: relative;
        user-select: none;

        &_indicator {
          position: absolute;
          border-radius: 50%;
          width: 10px;
          height: 10px;
          top: -2px;
          right: -2px;
          background-color: #e75656;
        }
      }

      &_times {
        flex-grow: 1;
        display: flex;
        align-items: start;
        flex-direction: column;

        &_calculated {
          font-size: 12px;
        }

        &_scheduled {
          font-size: 10px;
          color: #c2a3a3;
        }
      }
    }
  }
}
</style>
