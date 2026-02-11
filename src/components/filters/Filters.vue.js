/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { allBusLines, allTramLines, routeColors } from "@/constants/vehicle";
import { getService, Types } from "@/di-container";
import { useAppStore } from "@/store/app";
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { computed } from "vue";
import { useDisplay } from "vuetify";
import FilterChip from "./FilterChip.vue";
const appStore = useAppStore();
const { mobile } = useDisplay();
const mapService = getService(Types.MapService);
const addToFilter = (value) => {
    if (!appStore.activeVehicle) {
        appStore.addToRoutesFilter(value);
    }
};
const filtersStyle = computed(() => ({
    height: mobile.value ? "" : "calc(100% - 120px)"
}));
const allTramsShowing = computed(() => {
    return allTramLines.every((x) => appStore.leftMenuFilters.activeRoutes.has(x));
});
const allBusesShowing = computed(() => {
    return allBusLines.every((x) => appStore.leftMenuFilters.activeRoutes.has(x));
});
const filtersActive = computed(() => {
    return appStore.leftMenuFilters.activeRoutes.size;
});
const clearFilters = () => {
    appStore.leftMenuFilters.activeRoutes.clear();
};
const shouldDisableControls = computed(() => {
    return appStore.activeVehicle !== null;
});
const toggleBuses = () => {
    if (allBusesShowing.value) {
        allBusLines.forEach((x) => appStore.leftMenuFilters.activeRoutes.delete(x));
    }
    else {
        allBusLines.forEach((x) => {
            appStore.leftMenuFilters.activeRoutes.add(x);
        });
    }
};
const toggleTrams = () => {
    if (allTramsShowing.value) {
        allTramLines.forEach((x) => appStore.leftMenuFilters.activeRoutes.delete(x));
    }
    else {
        allTramLines.forEach((x) => {
            appStore.leftMenuFilters.activeRoutes.add(x);
        });
    }
};
const toggleBajsStops = () => {
    appStore.leftMenuFilters.bajsStops = !appStore.leftMenuFilters.bajsStops;
};
const goToCurrentLocation = async () => {
    if (Capacitor.isNativePlatform()) {
        const pos = await Geolocation.getCurrentPosition();
        mapService.goToLocation([pos.coords.latitude, pos.coords.longitude]);
    }
    else {
        navigator.geolocation.getCurrentPosition((position) => {
            mapService.goToLocation([position.coords.latitude, position.coords.longitude]);
        }, () => {
            //
        });
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filters" },
    ...{ style: (__VLS_ctx.filtersStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex justify-center my-2" },
});
const __VLS_0 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: (__VLS_ctx.allBusesShowing ? 'blue' : 'grey'),
    disabled: (__VLS_ctx.shouldDisableControls),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: (__VLS_ctx.allBusesShowing ? 'blue' : 'grey'),
    disabled: (__VLS_ctx.shouldDisableControls),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.toggleBuses)
};
__VLS_3.slots.default;
const __VLS_8 = {}.VTooltip;
/** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    activator: "parent",
}));
const __VLS_10 = __VLS_9({
    activator: "parent",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
var __VLS_11;
const __VLS_12 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
var __VLS_15;
var __VLS_3;
const __VLS_16 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    ...{ class: "ml-3" },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: (__VLS_ctx.allTramsShowing ? 'blue' : 'grey'),
    disabled: (__VLS_ctx.shouldDisableControls),
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    ...{ class: "ml-3" },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: (__VLS_ctx.allTramsShowing ? 'blue' : 'grey'),
    disabled: (__VLS_ctx.shouldDisableControls),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.toggleTrams)
};
__VLS_19.slots.default;
const __VLS_24 = {}.VTooltip;
/** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    activator: "parent",
}));
const __VLS_26 = __VLS_25({
    activator: "parent",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
var __VLS_27;
const __VLS_28 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
var __VLS_31;
var __VLS_19;
const __VLS_32 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ 'onClick': {} },
    ...{ class: "ml-3" },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: (__VLS_ctx.appStore.leftMenuFilters.bajsStops ? 'blue' : 'grey'),
    disabled: (__VLS_ctx.shouldDisableControls),
}));
const __VLS_34 = __VLS_33({
    ...{ 'onClick': {} },
    ...{ class: "ml-3" },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: (__VLS_ctx.appStore.leftMenuFilters.bajsStops ? 'blue' : 'grey'),
    disabled: (__VLS_ctx.shouldDisableControls),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_36;
let __VLS_37;
let __VLS_38;
const __VLS_39 = {
    onClick: (__VLS_ctx.toggleBajsStops)
};
__VLS_35.slots.default;
const __VLS_40 = {}.VTooltip;
/** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    activator: "parent",
}));
const __VLS_42 = __VLS_41({
    activator: "parent",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
var __VLS_43;
const __VLS_44 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
var __VLS_47;
var __VLS_35;
const __VLS_48 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    ...{ 'onClick': {} },
    ...{ class: "ml-3" },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: "blue",
}));
const __VLS_50 = __VLS_49({
    ...{ 'onClick': {} },
    ...{ class: "ml-3" },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: "blue",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_52;
let __VLS_53;
let __VLS_54;
const __VLS_55 = {
    onClick: (__VLS_ctx.goToCurrentLocation)
};
__VLS_51.slots.default;
const __VLS_56 = {}.VTooltip;
/** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    activator: "parent",
}));
const __VLS_58 = __VLS_57({
    activator: "parent",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
var __VLS_59;
const __VLS_60 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_63.slots.default;
var __VLS_63;
var __VLS_51;
const __VLS_64 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    ...{ 'onClick': {} },
    ...{ class: "ml-3" },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: (__VLS_ctx.filtersActive ? 'blue-lighten-1' : 'grey'),
    disabled: (__VLS_ctx.shouldDisableControls),
}));
const __VLS_66 = __VLS_65({
    ...{ 'onClick': {} },
    ...{ class: "ml-3" },
    icon: true,
    flat: true,
    variant: "text",
    size: "30px",
    color: (__VLS_ctx.filtersActive ? 'blue-lighten-1' : 'grey'),
    disabled: (__VLS_ctx.shouldDisableControls),
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_68;
let __VLS_69;
let __VLS_70;
const __VLS_71 = {
    onClick: (__VLS_ctx.clearFilters)
};
__VLS_67.slots.default;
const __VLS_72 = {}.VTooltip;
/** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    activator: "parent",
}));
const __VLS_74 = __VLS_73({
    activator: "parent",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
__VLS_75.slots.default;
var __VLS_75;
const __VLS_76 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({}));
const __VLS_78 = __VLS_77({}, ...__VLS_functionalComponentArgsRest(__VLS_77));
__VLS_79.slots.default;
var __VLS_79;
var __VLS_67;
const __VLS_80 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({}));
const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex pl-2 py-1 ga-2" },
});
const __VLS_84 = {}.VCheckbox;
/** @type {[typeof __VLS_components.VCheckbox, typeof __VLS_components.vCheckbox, typeof __VLS_components.VCheckbox, typeof __VLS_components.vCheckbox, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    modelValue: (__VLS_ctx.appStore.leftMenuFilters.showNight),
    hideDetails: true,
    color: "blue",
    density: "compact",
    disabled: (__VLS_ctx.shouldDisableControls),
}));
const __VLS_86 = __VLS_85({
    modelValue: (__VLS_ctx.appStore.leftMenuFilters.showNight),
    hideDetails: true,
    color: "blue",
    density: "compact",
    disabled: (__VLS_ctx.shouldDisableControls),
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
__VLS_87.slots.default;
{
    const { label: __VLS_thisSlot } = __VLS_87.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "route_display_label" },
    });
}
var __VLS_87;
const __VLS_88 = {}.VCheckbox;
/** @type {[typeof __VLS_components.VCheckbox, typeof __VLS_components.vCheckbox, typeof __VLS_components.VCheckbox, typeof __VLS_components.vCheckbox, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    modelValue: (__VLS_ctx.appStore.leftMenuFilters.satelliteMap),
    hideDetails: true,
    color: "blue",
    density: "compact",
}));
const __VLS_90 = __VLS_89({
    modelValue: (__VLS_ctx.appStore.leftMenuFilters.satelliteMap),
    hideDetails: true,
    color: "blue",
    density: "compact",
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
__VLS_91.slots.default;
{
    const { label: __VLS_thisSlot } = __VLS_91.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "route_display_label" },
    });
}
var __VLS_91;
const __VLS_92 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({}));
const __VLS_94 = __VLS_93({}, ...__VLS_functionalComponentArgsRest(__VLS_93));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "vehicle_filters" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-column justify-center my-2 pb-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-caption pl-2 text-grey-darken-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex ga-2 flex-wrap pl-2 mt-2" },
});
for (const [tram] of __VLS_getVForSourceType((__VLS_ctx.appStore.tramsToDisplay))) {
    /** @type {[typeof FilterChip, ]} */ ;
    // @ts-ignore
    const __VLS_96 = __VLS_asFunctionalComponent(FilterChip, new FilterChip({
        ...{ 'onClick': {} },
        key: (tram),
        text: (tram.toString()),
        active: (__VLS_ctx.appStore.leftMenuFilters.activeRoutes.has(tram)),
        color: (__VLS_ctx.routeColors[tram]),
    }));
    const __VLS_97 = __VLS_96({
        ...{ 'onClick': {} },
        key: (tram),
        text: (tram.toString()),
        active: (__VLS_ctx.appStore.leftMenuFilters.activeRoutes.has(tram)),
        color: (__VLS_ctx.routeColors[tram]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_96));
    let __VLS_99;
    let __VLS_100;
    let __VLS_101;
    const __VLS_102 = {
        onClick: (...[$event]) => {
            __VLS_ctx.addToFilter(tram);
        }
    };
    var __VLS_98;
}
const __VLS_103 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({}));
const __VLS_105 = __VLS_104({}, ...__VLS_functionalComponentArgsRest(__VLS_104));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-column column justify-center my-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-caption pl-2 text-grey-darken-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex ga-2 flex-wrap pl-2 mt-2" },
});
for (const [bus] of __VLS_getVForSourceType((__VLS_ctx.appStore.busesToDisplay))) {
    /** @type {[typeof FilterChip, ]} */ ;
    // @ts-ignore
    const __VLS_107 = __VLS_asFunctionalComponent(FilterChip, new FilterChip({
        ...{ 'onClick': {} },
        key: (bus),
        text: (bus.toString()),
        active: (__VLS_ctx.appStore.leftMenuFilters.activeRoutes.has(bus)),
        color: (__VLS_ctx.routeColors[bus]),
    }));
    const __VLS_108 = __VLS_107({
        ...{ 'onClick': {} },
        key: (bus),
        text: (bus.toString()),
        active: (__VLS_ctx.appStore.leftMenuFilters.activeRoutes.has(bus)),
        color: (__VLS_ctx.routeColors[bus]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_107));
    let __VLS_110;
    let __VLS_111;
    let __VLS_112;
    const __VLS_113 = {
        onClick: (...[$event]) => {
            __VLS_ctx.addToFilter(bus);
        }
    };
    var __VLS_109;
}
/** @type {__VLS_StyleScopedClasses['filters']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['route_display_label']} */ ;
/** @type {__VLS_StyleScopedClasses['route_display_label']} */ ;
/** @type {__VLS_StyleScopedClasses['vehicle_filters']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-grey-darken-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['column']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-grey-darken-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            routeColors: routeColors,
            FilterChip: FilterChip,
            appStore: appStore,
            addToFilter: addToFilter,
            filtersStyle: filtersStyle,
            allTramsShowing: allTramsShowing,
            allBusesShowing: allBusesShowing,
            filtersActive: filtersActive,
            clearFilters: clearFilters,
            shouldDisableControls: shouldDisableControls,
            toggleBuses: toggleBuses,
            toggleTrams: toggleTrams,
            toggleBajsStops: toggleBajsStops,
            goToCurrentLocation: goToCurrentLocation,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
