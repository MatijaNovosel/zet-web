/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { getService, Types } from "@/di-container";
import { getColorByRouteId } from "@/helpers/misc";
import { useAppStore } from "@/store/app";
const appStore = useAppStore();
const mapService = getService(Types.MapService);
function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return {
        hours,
        minutes
    };
}
const formatArrivalTime = (val) => {
    if (val === 0) {
        return "Stiglo";
    }
    else if (val >= 60) {
        const { hours, minutes } = toHoursAndMinutes(val);
        return `${hours}h ${minutes}min`;
    }
    return `${val} min`;
};
const goToVehicle = (vehicleId) => {
    if (vehicleId) {
        mapService.goToVehicleLocation(vehicleId.toString());
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.appStore.activeStop) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "d-flex flex-column" },
    });
    if (__VLS_ctx.appStore.stopArrivals.length) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "stop_arrivals" },
        });
        for (const [arrival, i] of __VLS_getVForSourceType((__VLS_ctx.appStore.stopArrivals))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (i),
                ...{ class: "stop_arrivals_item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.appStore.activeStop))
                            return;
                        if (!(__VLS_ctx.appStore.stopArrivals.length))
                            return;
                        __VLS_ctx.goToVehicle(arrival.vehicleId);
                    } },
                ...{ class: "stop_arrivals_item_route" },
                ...{ style: ({
                        backgroundColor: __VLS_ctx.getColorByRouteId(arrival.routeId),
                        cursor: arrival.vehicleId ? 'pointer' : ''
                    }) },
            });
            (arrival.routeId);
            if (arrival.vehicleId) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
                    ...{ class: "stop_arrivals_item_route_indicator pulse" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
                    ...{ class: "stop_arrivals_item_route_indicator" },
                });
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "stop_arrivals_item_times" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "stop_arrivals_item_times_calculated" },
            });
            (arrival.calculatedArrivalTime);
            (__VLS_ctx.formatArrivalTime(arrival.arrivalTimeInMinutes));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "stop_arrivals_item_times_scheduled" },
            });
            (arrival.scheduledArrivalTime);
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "stop_arrivals_not_found" },
        });
    }
}
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['stop_arrivals']} */ ;
/** @type {__VLS_StyleScopedClasses['stop_arrivals_item']} */ ;
/** @type {__VLS_StyleScopedClasses['stop_arrivals_item_route']} */ ;
/** @type {__VLS_StyleScopedClasses['stop_arrivals_item_route_indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['stop_arrivals_item_route_indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['stop_arrivals_item_times']} */ ;
/** @type {__VLS_StyleScopedClasses['stop_arrivals_item_times_calculated']} */ ;
/** @type {__VLS_StyleScopedClasses['stop_arrivals_item_times_scheduled']} */ ;
/** @type {__VLS_StyleScopedClasses['stop_arrivals_not_found']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            getColorByRouteId: getColorByRouteId,
            appStore: appStore,
            formatArrivalTime: formatArrivalTime,
            goToVehicle: goToVehicle,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
