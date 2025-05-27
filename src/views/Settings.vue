<template>
  <v-container class="main-ctr">
    <mobile-drawer-controls hide-right />
    <v-card
      class="pa-5"
      flat
      border
    >
      <v-card-text class="d-flex flex-column flex-gap pt-0">
        <div class="text-grey">
          {{ i18n.t("appPreferences") }}
        </div>
        <language-picker />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import LanguagePicker from "@/components/languagePicker/LanguagePicker.vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
</script>
