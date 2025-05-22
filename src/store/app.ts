import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";

interface ILeftMenuFilters {
  showBus: boolean;
  showTram: boolean;
  menuOpen: boolean;
  activeVehicles: Set<string>;
}

export const useAppStore = defineStore(
  "app",
  () => {
    // Data
    const loading = ref(false);
    const loadingData = ref(false);
    const language = ref("en");
    const darkMode = ref(false);

    const leftMenuFilters = reactive<ILeftMenuFilters>({
      showBus: true,
      showTram: true,
      menuOpen: true,
      activeVehicles: new Set()
    });

    // Composables
    const theme = useTheme();
    const i18n = useI18n();

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      theme.global.name.value = darkMode.value ? "dark" : "light";
    };

    const setTheme = (value: string) => {
      darkMode.value = value === "dark";
      theme.global.name.value = darkMode.value ? "dark" : "light";
    };

    const setLanguage = (lang: string) => {
      language.value = lang;
      i18n.locale.value = lang;
    };

    return {
      loading,
      darkMode,
      language,
      loadingData,
      leftMenuFilters,
      toggleDarkMode,
      setTheme,
      setLanguage
    };
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ["darkMode", "language"]
    }
  }
);
