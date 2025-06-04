<template>
  <v-layout>
    <alerts />
    <left-drawer v-if="mobile" />
    <template v-else>
      <left-menu />
      <right-menu v-if="appStore.activeStop || appStore.activeVehicle" />
    </template>
    <v-main class="main">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import LeftDrawer from "@/components/navigation/LeftDrawer.vue";
import { useAppStore } from "@/store/app";
import { useDisplay } from "vuetify";
import LeftMenu from "../components/navigation/LeftMenu.vue";
import RightMenu from "../components/navigation/RightMenu.vue";
import Alerts from "../components/notifications/Alerts.vue";

const { mobile } = useDisplay();
const appStore = useAppStore();
</script>

<style scoped lang="scss">
.main {
  overflow: auto;
}
</style>
