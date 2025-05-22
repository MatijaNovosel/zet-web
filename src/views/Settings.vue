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
        <v-select
          prepend-icon="mdi-moon-waning-crescent"
          hide-details
          density="compact"
          v-model="theme"
          :items="THEME_OPTIONS"
          :placeholder="i18n.t('theme')"
          @update:model-value="updateTheme"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import LanguagePicker from "@/components/languagePicker/LanguagePicker.vue";
import { THEME_OPTIONS } from "@/constants/app";
import { useAppStore } from "@/store/app";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const appStore = useAppStore();

const theme = ref<string | null>(null);

const updateTheme = () => {
  appStore.setTheme(theme.value || "light");
};

onMounted(() => {
  theme.value = appStore.darkMode ? "dark" : "light";
});
</script>
