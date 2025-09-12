<template>
  <v-app>
    <v-overlay
      v-model="appStore.loading"
      persistent
      contained
      z-index="2000"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="orange"
        indeterminate
        size="160"
        width="16"
      >
        <v-icon
          class="spinPulse"
          size="70"
        >
          mdi-timer-sand
        </v-icon>
      </v-progress-circular>
    </v-overlay>
    <confirmation-dialog-provider>
      <router-view />
    </confirmation-dialog-provider>
  </v-app>
</template>

<script setup lang="ts">
import { SafeArea } from "@capacitor-community/safe-area";
import ConfirmationDialogProvider from "./components/confirmationDialog/ConfirmationDialogProvider.vue";
import { useAppStore } from "./store/app";

const appStore = useAppStore();

SafeArea.enable({
  config: {
    customColorsForSystemBars: true,
    statusBarColor: "#00000000",
    statusBarContent: "light",
    navigationBarColor: "#00000000",
    navigationBarContent: "light"
  }
});
</script>
