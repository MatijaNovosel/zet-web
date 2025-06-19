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
            backgroundColor: getColorByRouteId(arrival.routeId)
          }"
        >
          {{ arrival.routeId }}
        </div>
        <div class="stop_arrivals_item_times">
          <div class="stop_arrivals_item_times_calculated">
            {{ arrival.calculatedArrivalTime }} ({{ arrival.arrivalTimeInMinutes }} min)
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
import { getColorByRouteId } from "@/helpers/misc";
import { useAppStore } from "@/store/app";

const appStore = useAppStore();
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
        font-size: 10px;
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
</style>
