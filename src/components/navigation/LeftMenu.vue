<template>
  <div
    class="left_menu elevation-2"
    :style="leftMenuStyle"
  >
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
      <filters />
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
import { useAppStore } from "@/store/app";
import { computed } from "vue";
import { version } from "../../../package.json";
import Filters from "../filters/Filters.vue";

const appStore = useAppStore();

const leftMenuStyle = computed(() => ({
  height: appStore.leftMenuFilters.menuOpen ? "calc(100% - 50px)" : ""
}));
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
</style>
