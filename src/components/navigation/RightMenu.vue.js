/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useNotifications } from "@/composables/useNotifications";
import { WEB_URL } from "@/constants/app";
import { getService, Types } from "@/di-container";
import { getColorByRouteId } from "@/helpers/misc";
import { useAppStore } from "@/store/app";
import { computed, watch } from "vue";
import StopArrivalsList from "./StopArrivalsList.vue";
const appStore = useAppStore();
const mapService = getService(Types.MapService);
const notify = useNotifications();
const menuTitle = computed(() => {
    if (appStore.activeVehicle) {
        return `Vozilo ${appStore.activeVehicle.vehicle.id}`;
    }
    else if (appStore.activeStop) {
        return appStore.activeStop.stopName;
    }
});
const menuSubtitle = computed(() => {
    if (appStore.activeVehicle) {
        return `Ruta ${appStore.activeVehicle.trip.routeId}`;
    }
    else if (appStore.activeStop) {
        return appStore.activeStop.stopId;
    }
});
const closeMenu = () => {
    if (appStore.activeVehicle) {
        appStore.setActiveVehicle(null);
        mapService.removeActiveVehicle();
        if (appStore.trackingVehicle) {
            mapService.stopTrackingVehicle();
        }
    }
    appStore.setActiveStop(null);
};
const goToLocation = () => {
    if (appStore.activeVehicle) {
        mapService.goToVehicleLocation(appStore.activeVehicle.vehicle.id);
    }
    else if (appStore.activeStop) {
        mapService.goToStopLocation(appStore.activeStop.stopId);
    }
};
const shareVehicle = () => {
    navigator.clipboard.writeText(`${WEB_URL}${appStore.activeVehicle?.vehicle.id}`);
    notify.alert({
        text: "Vehicle copied to clipboard",
        type: "success"
    });
};
watch(() => appStore.trackingVehicle, (val) => {
    if (val) {
        mapService.trackVehicle(appStore.activeVehicle);
    }
    else {
        mapService.stopTrackingVehicle();
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right_menu elevation-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right_menu_toolbar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right_menu_toolbar_leading" },
});
if (__VLS_ctx.appStore.activeStop) {
    const __VLS_0 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        ...{ class: "mr-5" },
        icon: true,
        flat: true,
        variant: "text",
        size: "30px",
        color: "blue",
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        ...{ class: "mr-5" },
        icon: true,
        flat: true,
        variant: "text",
        size: "30px",
        color: "blue",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = {
        onClick: (__VLS_ctx.goToLocation)
    };
    __VLS_3.slots.default;
    const __VLS_8 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
    const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    var __VLS_11;
    var __VLS_3;
}
if (__VLS_ctx.appStore.activeVehicle) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "right_menu_toolbar_leading_vehicle_circle" },
        ...{ style: ({
                backgroundColor: __VLS_ctx.getColorByRouteId(__VLS_ctx.appStore.activeVehicle.trip.routeId)
            }) },
    });
    (__VLS_ctx.appStore.activeVehicle.trip.routeId);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right_menu_toolbar_leading_text" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right_menu_toolbar_leading_text_title" },
});
(__VLS_ctx.menuTitle);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right_menu_toolbar_leading_text_subtitle" },
});
(__VLS_ctx.menuSubtitle);
const __VLS_12 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onClick': {} },
    icon: "mdi-close",
    variant: "text",
    size: "40px",
    color: "black",
}));
const __VLS_14 = __VLS_13({
    ...{ 'onClick': {} },
    icon: "mdi-close",
    variant: "text",
    size: "40px",
    color: "black",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onClick: (__VLS_ctx.closeMenu)
};
var __VLS_15;
const __VLS_20 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
if (__VLS_ctx.appStore.activeVehicle) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "d-flex align-center justify-space-between pl-4 py-2" },
    });
    const __VLS_24 = {}.VCheckbox;
    /** @type {[typeof __VLS_components.VCheckbox, typeof __VLS_components.vCheckbox, typeof __VLS_components.VCheckbox, typeof __VLS_components.vCheckbox, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        hideDetails: true,
        density: "compact",
        color: "blue",
        modelValue: (__VLS_ctx.appStore.trackingVehicle),
    }));
    const __VLS_26 = __VLS_25({
        hideDetails: true,
        density: "compact",
        color: "blue",
        modelValue: (__VLS_ctx.appStore.trackingVehicle),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_27.slots.default;
    {
        const { label: __VLS_thisSlot } = __VLS_27.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "track_vehicle_label" },
        });
    }
    var __VLS_27;
    const __VLS_28 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ 'onClick': {} },
        ...{ class: "mr-5" },
        icon: true,
        flat: true,
        variant: "text",
        size: "30px",
        color: "blue",
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onClick': {} },
        ...{ class: "mr-5" },
        icon: true,
        flat: true,
        variant: "text",
        size: "30px",
        color: "blue",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_32;
    let __VLS_33;
    let __VLS_34;
    const __VLS_35 = {
        onClick: (__VLS_ctx.goToLocation)
    };
    __VLS_31.slots.default;
    const __VLS_36 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
    const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    var __VLS_39;
    var __VLS_31;
    const __VLS_40 = {}.VDivider;
    /** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
    const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "d-flex align-center justify-end py-3 pr-5" },
    });
    const __VLS_44 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        ...{ 'onClick': {} },
        variant: "text",
        rounded: "0",
        color: "blue-darken-1",
        ...{ class: "text-none" },
    }));
    const __VLS_46 = __VLS_45({
        ...{ 'onClick': {} },
        variant: "text",
        rounded: "0",
        color: "blue-darken-1",
        ...{ class: "text-none" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    let __VLS_48;
    let __VLS_49;
    let __VLS_50;
    const __VLS_51 = {
        onClick: (__VLS_ctx.shareVehicle)
    };
    __VLS_47.slots.default;
    var __VLS_47;
}
/** @type {[typeof StopArrivalsList, ]} */ ;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(StopArrivalsList, new StopArrivalsList({}));
const __VLS_53 = __VLS_52({}, ...__VLS_functionalComponentArgsRest(__VLS_52));
/** @type {__VLS_StyleScopedClasses['right_menu']} */ ;
/** @type {__VLS_StyleScopedClasses['elevation-2']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar_leading']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-5']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar_leading_vehicle_circle']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar_leading_text']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar_leading_text_title']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar_leading_text_subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['track_vehicle_label']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-5']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            getColorByRouteId: getColorByRouteId,
            StopArrivalsList: StopArrivalsList,
            appStore: appStore,
            menuTitle: menuTitle,
            menuSubtitle: menuSubtitle,
            closeMenu: closeMenu,
            goToLocation: goToLocation,
            shareVehicle: shareVehicle,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
