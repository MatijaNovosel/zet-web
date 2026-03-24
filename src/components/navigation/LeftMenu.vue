<template>
  <div
    class="left_menu elevation-2"
    :style="leftMenuStyle"
  >
    <v-list-item
      title="ZET Uživo"
      subtitle="ZET tramvaji i autobusi uživo - interaktivna karta Zagreba u stvarnom vremenu"
      class="text-subtitle-2 py-3"
    >
      <template #prepend>
        <v-progress-circular
          color="blue"
          bg-color="black"
          :model-value="appStore.progress"
          class="mr-5"
        />
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
        color="white"
        @click="appStore.leftMenuFilters.menuOpen = !appStore.leftMenuFilters.menuOpen"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { computed } from "vue";
import Filters from "../filters/Filters.vue";

const appStore = useAppStore();

const leftMenuStyle = computed(() => ({
  height: appStore.leftMenuFilters.menuOpen ? "calc(100% - 50px)" : ""
}));
</script>

<style lang="scss" scoped>
.left_menu {
  position: absolute;
  background-color: #1d232a;
  color: white;
  z-index: 999;
  top: 25px;
  left: 25px;
  width: 300px;
  border-radius: 8px;
}
</style>
