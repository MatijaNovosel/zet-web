<template>
  <v-layout>
    <alerts />
    <left-drawer v-if="mobile" />
    <left-menu v-else />
    <v-main
      class="main"
      :class="theme.current.value.dark ? '' : 'bg-grey-lighten-4'"
    >
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import LeftDrawer from "@/components/navigation/LeftDrawer.vue";
import { useDisplay, useTheme } from "vuetify";
import LeftMenu from "../components/navigation/LeftMenu.vue";
import Alerts from "../components/notifications/Alerts.vue";

const theme = useTheme();

const { mobile } = useDisplay();
</script>

<style scoped lang="scss">
.main {
  overflow: auto;
}
</style>
