import { IStopsService } from "@/api/interfaces/stops";
import { POLLING_DURATION } from "@/constants/app";
import { allBusLines, allTramLines, busLines, tramLines } from "@/constants/vehicle";
import { getService, Types } from "@/di-container";
import { IStopArrivalModel, IStopModel } from "@/models/stop";
import { IVehicleModel } from "@/models/vehicle";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

interface ILeftMenuFilters {
  showBus: boolean;
  showTram: boolean;
  menuOpen: boolean;
  showNight: boolean;
  showRoutes: boolean;
  satelliteMap: boolean;
  activeRoutes: Set<string>;
}

export const useAppStore = defineStore("app", () => {
  // Data
  const loading = ref(false);
  const loadingData = ref(false);
  const loadingArrivals = ref(false);
  const trackingVehicle = ref(false);
  const rightMenu = ref(false);
  const progress = ref(0);
  const activeStop = ref<IStopModel | null>(null);
  const activeVehicle = ref<IVehicleModel | null>(null);

  const stopArrivals = ref<IStopArrivalModel[]>([]);

  const stopService = getService<IStopsService>(Types.StopsService);

  const leftMenuFilters = reactive<ILeftMenuFilters>({
    showBus: true,
    showTram: true,
    menuOpen: true,
    showNight: true,
    showRoutes: false,
    satelliteMap: false,
    activeRoutes: new Set()
  });

  let progressInterval: NodeJS.Timeout | undefined;
  let stopArrivalsInterval: NodeJS.Timeout | undefined;

  const getStopArrivals = async (stop: IStopModel) => {
    try {
      loadingArrivals.value = true;
      stopArrivals.value = await stopService.getArrivals(stop.stopId);
    } finally {
      loadingArrivals.value = false;
    }
  };

  const setActiveStop = async (stop: IStopModel | null) => {
    if (activeStop.value?.stopId === stop?.stopId) return;
    if (stopArrivalsInterval) {
      clearInterval(stopArrivalsInterval);
    }
    if (stop) {
      getStopArrivals(stop);
      stopArrivalsInterval = setInterval(async () => {
        getStopArrivals(stop);
      }, 5_000);
    }
    activeStop.value = stop;
  };

  const setActiveVehicle = (vehicle: IVehicleModel | null) => {
    if (activeVehicle.value?.vehicle.id === vehicle?.vehicle.id) return;

    if (!vehicle) {
      leftMenuFilters.activeRoutes.delete(activeVehicle.value?.trip.routeId!);
    }

    activeVehicle.value = vehicle;
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

  const addToRoutesFilter = (value: string) => {
    if (leftMenuFilters.activeRoutes.has(value)) {
      leftMenuFilters.activeRoutes.delete(value);
    } else {
      leftMenuFilters.activeRoutes.add(value);
    }
  };

  return {
    loading,
    loadingData,
    leftMenuFilters,
    tramsToDisplay,
    busesToDisplay,
    progress,
    rightMenu,
    activeStop,
    activeVehicle,
    trackingVehicle,
    stopArrivals,
    loadingArrivals,
    setActiveVehicle,
    setActiveStop,
    addToRoutesFilter,
    startProgress
  };
});
