<template>
  <v-layout>
    <alerts />
    <left-menu />
    <v-main
      class="main"
      :class="theme.current.value.dark ? '' : 'bg-grey-lighten-4'"
    >
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import LeftMenu from "../components/navigation/LeftMenu.vue";
import Alerts from "../components/notifications/Alerts.vue";

const theme = useTheme();
</script>

<style scoped lang="scss">
.main {
  overflow: auto;
}
</style>
