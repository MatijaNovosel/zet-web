<template>
  <v-btn
    v-if="mobile && !drawer"
    icon="mdi-menu"
    color="white"
    :size="40"
    class="drawer_btn"
    @click="drawer = !drawer"
  />
  <v-navigation-drawer
    :order="1"
    v-model="drawer"
    mobile
  >
    <template #prepend>
      <v-list-item
        title="ZET Uživo"
        subtitle="ZET tramvaji i autobusi uživo – interaktivna karta Zagreba u stvarnom vremenu"
        class="text-subtitle-2 py-3"
      >
        <template #prepend>
          <v-progress-circular
            color="blue"
            :model-value="appStore.progress"
            class="mr-5"
          >
            <v-icon
              class="spinPulse"
              size="15"
            >
              mdi-timer-sand
            </v-icon>
          </v-progress-circular>
        </template>
        <template #append>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="black"
            :size="35"
            @click="drawer = !drawer"
          />
        </template>
      </v-list-item>
    </template>
    <v-divider />
    <filters />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { ref } from "vue";
import { useDisplay } from "vuetify";
import Filters from "../filters/Filters.vue";

const appStore = useAppStore();
const { mobile } = useDisplay();

const drawer = ref(false);
</script>

<style lang="scss" scoped>
.drawer_btn {
  position: absolute;
  z-index: 9999;
  top: 12px;
  left: 12px;
}
</style>
