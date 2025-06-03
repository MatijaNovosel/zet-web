import { POLLING_DURATION } from "@/constants/app";
import { allBusLines, allTramLines, busLines, tramLines } from "@/constants/vehicle";
import { IStopModel } from "@/models/stop";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

interface ILeftMenuFilters {
  showBus: boolean;
  showTram: boolean;
  menuOpen: boolean;
  showNight: boolean;
  showRoutes: boolean;
  satelliteMap: boolean;
  activeVehicles: Set<string>;
}

export const useAppStore = defineStore(
  "app",
  () => {
    // Data
    const loading = ref(false);
    const loadingData = ref(false);
    const rightMenu = ref(false);
    const language = ref("en");
    const progress = ref(0);
    const currentLocationTrigger = ref<[number, number]>([0, 0]);
    const activeStop = ref<IStopModel | null>(null);

    const leftMenuFilters = reactive<ILeftMenuFilters>({
      showBus: true,
      showTram: true,
      menuOpen: true,
      showNight: true,
      showRoutes: false,
      satelliteMap: false,
      activeVehicles: new Set()
    });

    let progressInterval: NodeJS.Timeout | undefined;

    // Composables
    const i18n = useI18n();

    const setLanguage = (lang: string) => {
      language.value = lang;
      i18n.locale.value = lang;
    };

    const setActiveStop = (stop: IStopModel | null) => {
      if (activeStop.value?.stopId === stop?.stopId) return;
      activeStop.value = stop;
    };

    const startProgress = () => {
      const duration = POLLING_DURATION;
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

    const moveToCurrentLocation = (coords: [number, number]) => {
      currentLocationTrigger.value = coords;
    };

    const addToVehicleFilter = (value: string) => {
      if (leftMenuFilters.activeVehicles.has(value)) {
        leftMenuFilters.activeVehicles.delete(value);
      } else {
        leftMenuFilters.activeVehicles.add(value);
      }
    };

    return {
      loading,
      language,
      loadingData,
      leftMenuFilters,
      tramsToDisplay,
      busesToDisplay,
      progress,
      currentLocationTrigger,
      rightMenu,
      activeStop,
      setActiveStop,
      addToVehicleFilter,
      moveToCurrentLocation,
      startProgress,
      setLanguage
    };
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ["language"]
    }
  }
);
