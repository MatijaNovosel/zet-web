/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useNotifications } from "@/composables/useNotifications";
import { WEB_URL } from "@/constants/app";
import { getService, Types } from "@/di-container";
import { getColorByRouteId } from "@/helpers/misc";
import { useAppStore } from "@/store/app";
import { computed, ref, watch } from "vue";
import StopArrivalsList from "./StopArrivalsList.vue";
const appStore = useAppStore();
const drawer = ref(false);
const notify = useNotifications();
const mapService = getService(Types.MapService);
const goToLocation = () => {
    if (appStore.activeVehicle) {
        mapService.goToVehicleLocation(appStore.activeVehicle.vehicle.id);
    }
    else if (appStore.activeStop) {
        mapService.goToStopLocation(appStore.activeStop.stopId);
    }
};
const stopRoutes = computed(() => {
    if (appStore.activeStop) {
        return new Set(appStore.stopArrivals.map((x) => x.routeId));
    }
    return [];
});
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
const shareVehicle = () => {
    navigator.clipboard.writeText(`${WEB_URL}${appStore.activeVehicle?.vehicle.id}`);
    notify.alert({
        text: "Vehicle copied to clipboard",
        type: "success"
    });
};
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
    ...{ class: "toolbar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toolbar_title" },
});
if (__VLS_ctx.appStore.activeVehicle) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "toolbar_title_vehicle_circle" },
        ...{ style: ({
                backgroundColor: __VLS_ctx.getColorByRouteId(__VLS_ctx.appStore.activeVehicle.trip.routeId)
            }) },
    });
    (__VLS_ctx.appStore.activeVehicle.trip.routeId);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toolbar_title_text" },
});
(__VLS_ctx.menuTitle);
if (__VLS_ctx.appStore.activeStop) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "toolbar_title_route_list ml-2" },
    });
    for (const [route, i] of __VLS_getVForSourceType((__VLS_ctx.stopRoutes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "toolbar_title_route_list_item" },
            key: (i),
            ...{ style: ({
                    backgroundColor: __VLS_ctx.getColorByRouteId(route)
                }) },
        });
        (route);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    ...{ class: "toolbar_separator" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toolbar_actions" },
});
const __VLS_0 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ class: "ml-2" },
    size: "20",
    color: "blue-lighten-1",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ class: "ml-2" },
    size: "20",
    color: "blue-lighten-1",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.goToLocation)
};
__VLS_3.slots.default;
var __VLS_3;
const __VLS_8 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    ...{ class: "ml-2" },
    size: "22",
    color: "grey",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    ...{ class: "ml-2" },
    size: "22",
    color: "grey",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.closeMenu)
};
__VLS_11.slots.default;
var __VLS_11;
if (__VLS_ctx.appStore.activeVehicle) {
    const __VLS_16 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ 'onClick': {} },
        ...{ class: "ml-2" },
        size: "22",
        color: "grey",
    }));
    const __VLS_18 = __VLS_17({
        ...{ 'onClick': {} },
        ...{ class: "ml-2" },
        size: "22",
        color: "grey",
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    let __VLS_20;
    let __VLS_21;
    let __VLS_22;
    const __VLS_23 = {
        onClick: (__VLS_ctx.shareVehicle)
    };
    __VLS_19.slots.default;
    var __VLS_19;
}
if (__VLS_ctx.appStore.activeVehicle) {
    const __VLS_24 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ 'onClick': {} },
        ...{ class: "ml-2" },
        size: "22",
        color: (__VLS_ctx.appStore.trackingVehicle ? 'red' : 'grey'),
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onClick': {} },
        ...{ class: "ml-2" },
        size: "22",
        color: (__VLS_ctx.appStore.trackingVehicle ? 'red' : 'grey'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_28;
    let __VLS_29;
    let __VLS_30;
    const __VLS_31 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.appStore.activeVehicle))
                return;
            __VLS_ctx.appStore.trackingVehicle = !__VLS_ctx.appStore.trackingVehicle;
        }
    };
    __VLS_27.slots.default;
    var __VLS_27;
}
const __VLS_32 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ 'onClick': {} },
    ...{ class: "ml-2" },
    size: "22",
}));
const __VLS_34 = __VLS_33({
    ...{ 'onClick': {} },
    ...{ class: "ml-2" },
    size: "22",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_36;
let __VLS_37;
let __VLS_38;
const __VLS_39 = {
    onClick: (...[$event]) => {
        __VLS_ctx.drawer = !__VLS_ctx.drawer;
    }
};
__VLS_35.slots.default;
var __VLS_35;
const __VLS_40 = {}.VNavigationDrawer;
/** @type {[typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    order: (1),
    modelValue: (__VLS_ctx.drawer),
    mobile: true,
    location: "right",
}));
const __VLS_42 = __VLS_41({
    order: (1),
    modelValue: (__VLS_ctx.drawer),
    mobile: true,
    location: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right_menu_toolbar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right_menu_toolbar_leading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right_menu_toolbar_leading_action" },
});
const __VLS_44 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    ...{ 'onClick': {} },
    ...{ class: "mr-3" },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: "blue",
}));
const __VLS_46 = __VLS_45({
    ...{ 'onClick': {} },
    ...{ class: "mr-3" },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: "blue",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_48;
let __VLS_49;
let __VLS_50;
const __VLS_51 = {
    onClick: (__VLS_ctx.goToLocation)
};
__VLS_47.slots.default;
const __VLS_52 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_55.slots.default;
var __VLS_55;
var __VLS_47;
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
const __VLS_56 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({}));
const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
if (__VLS_ctx.appStore.activeVehicle) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex-column justify-center pl-5 py-2" },
    });
    const __VLS_60 = {}.VCheckbox;
    /** @type {[typeof __VLS_components.VCheckbox, typeof __VLS_components.vCheckbox, typeof __VLS_components.VCheckbox, typeof __VLS_components.vCheckbox, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        hideDetails: true,
        density: "compact",
        color: "blue",
        modelValue: (__VLS_ctx.appStore.trackingVehicle),
    }));
    const __VLS_62 = __VLS_61({
        hideDetails: true,
        density: "compact",
        color: "blue",
        modelValue: (__VLS_ctx.appStore.trackingVehicle),
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    __VLS_63.slots.default;
    {
        const { label: __VLS_thisSlot } = __VLS_63.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "track_vehicle_label" },
        });
    }
    var __VLS_63;
}
/** @type {[typeof StopArrivalsList, ]} */ ;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent(StopArrivalsList, new StopArrivalsList({}));
const __VLS_65 = __VLS_64({}, ...__VLS_functionalComponentArgsRest(__VLS_64));
var __VLS_43;
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar_title']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar_title_vehicle_circle']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar_title_text']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar_title_route_list']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar_title_route_list_item']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar_separator']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar_actions']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar_leading']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar_leading_action']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar_leading_text']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar_leading_text_title']} */ ;
/** @type {__VLS_StyleScopedClasses['right_menu_toolbar_leading_text_subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['track_vehicle_label']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            getColorByRouteId: getColorByRouteId,
            StopArrivalsList: StopArrivalsList,
            appStore: appStore,
            drawer: drawer,
            goToLocation: goToLocation,
            stopRoutes: stopRoutes,
            menuTitle: menuTitle,
            menuSubtitle: menuSubtitle,
            shareVehicle: shareVehicle,
            closeMenu: closeMenu,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
