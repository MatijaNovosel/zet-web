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
    :class="theme.current.value.dark ? '' : 'bg-grey-lighten-5'"
  >
    <template #prepend>
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
import { useDisplay, useTheme } from "vuetify";
import { version } from "../../../package.json";
import Filters from "../filters/Filters.vue";

const appStore = useAppStore();
const theme = useTheme();
const { mobile } = useDisplay();

const drawer = ref(false);
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

.drawer_btn {
  position: absolute;
  z-index: 9999;
  top: 12px;
  left: 12px;
}
</style>
