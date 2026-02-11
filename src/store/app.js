import { POLLING_DURATION } from "@/constants/app";
import { allBusLines, allTramLines, busLines, tramLines } from "@/constants/vehicle";
import { getService, Types } from "@/di-container";
import ROUTE_NAMES from "@/router/routeNames";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
export const useAppStore = defineStore("app", () => {
    // Data
    const loading = ref(false);
    const loadingData = ref(false);
    const loadingArrivals = ref(false);
    const trackingVehicle = ref(false);
    const rightMenu = ref(false);
    const progress = ref(0);
    const activeStop = ref(null);
    const activeVehicle = ref(null);
    const stopArrivals = ref([]);
    const stopService = getService(Types.StopsService);
    const router = useRouter();
    const leftMenuFilters = reactive({
        showBus: true,
        showTram: true,
        menuOpen: true,
        showNight: true,
        showRoutes: false,
        satelliteMap: false,
        bajsStops: false,
        activeRoutes: new Set()
    });
    let progressInterval;
    let stopArrivalsInterval;
    const getStopArrivals = async (stop) => {
        try {
            loadingArrivals.value = true;
            stopArrivals.value = await stopService.getArrivals(stop.stopId);
        }
        finally {
            loadingArrivals.value = false;
        }
    };
    const setActiveStop = async (stop) => {
        if (activeStop.value?.stopId === stop?.stopId)
            return;
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
    const setActiveVehicle = (vehicle) => {
        if (activeVehicle.value?.id === vehicle?.id)
            return;
        if (!vehicle) {
            leftMenuFilters.activeRoutes.delete(activeVehicle.value?.route_id);
        }
        router.replace({
            name: ROUTE_NAMES.HOME,
            params: {
                id: vehicle === null ? "home" : vehicle?.id
            }
        });
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
        }
        else {
            return [...allTramLines];
        }
    });
    const busesToDisplay = computed(() => {
        if (!leftMenuFilters.showNight) {
            return [...busLines];
        }
        else {
            return [...allBusLines];
        }
    });
    const addToRoutesFilter = (value) => {
        if (leftMenuFilters.activeRoutes.has(value)) {
            leftMenuFilters.activeRoutes.delete(value);
        }
        else {
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
