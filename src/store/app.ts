import { allBusLines, allTramLines, busLines, tramLines } from "@/constants/vehicle";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";

interface ILeftMenuFilters {
  showBus: boolean;
  showTram: boolean;
  menuOpen: boolean;
  showNight: boolean;
  showRoutes: boolean;
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
      showNight: true,
      showRoutes: false,
      activeVehicles: new Set()
    });

    const progress = ref(0);
    let progressInterval: NodeJS.Timeout | undefined;

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

    const startProgress = () => {
      const duration = 8000;
      const step = 100;
      const intervalMs = duration / step;

      progress.value = 0;
      clearInterval(progressInterval);

      progressInterval = setInterval(() => {
        progress.value += 100 / step;
        if (progress.value >= 100) {
          progress.value = 100;
        }
      }, intervalMs);
    };

    const tramsToDisplay = computed(() => {
      if (!leftMenuFilters.showNight) {
        return [...tramLines];
      } else {
        return [...allTramLines];
      }
    });

    const busesToDisplay = computed(() => {
      if (!leftMenuFilters.showNight) {
        return [...busLines];
      } else {
        return [...allBusLines];
      }
    });

    return {
      loading,
      darkMode,
      language,
      loadingData,
      leftMenuFilters,
      tramsToDisplay,
      busesToDisplay,
      progress,
      startProgress,
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
