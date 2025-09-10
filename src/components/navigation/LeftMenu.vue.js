/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useAppStore } from "@/store/app";
import { computed } from "vue";
import { version } from "../../../package.json";
import Filters from "../filters/Filters.vue";
const appStore = useAppStore();
const leftMenuStyle = computed(() => ({
    height: appStore.leftMenuFilters.menuOpen ? "calc(100% - 50px)" : ""
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "left_menu elevation-2" },
    ...{ style: (__VLS_ctx.leftMenuStyle) },
});
const __VLS_0 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: "ZET Web",
    subtitle: (__VLS_ctx.version),
    ...{ class: "text-subtitle-2 py-3" },
}));
const __VLS_2 = __VLS_1({
    title: "ZET Web",
    subtitle: (__VLS_ctx.version),
    ...{ class: "text-subtitle-2 py-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_4 = {}.VProgressCircular;
    /** @type {[typeof __VLS_components.VProgressCircular, typeof __VLS_components.vProgressCircular, typeof __VLS_components.VProgressCircular, typeof __VLS_components.vProgressCircular, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        color: "blue",
        modelValue: (__VLS_ctx.appStore.progress),
        ...{ class: "mr-5" },
    }));
    const __VLS_6 = __VLS_5({
        color: "blue",
        modelValue: (__VLS_ctx.appStore.progress),
        ...{ class: "mr-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    const __VLS_8 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ class: "spinPulse" },
        size: "15",
    }));
    const __VLS_10 = __VLS_9({
        ...{ class: "spinPulse" },
        size: "15",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    var __VLS_11;
    var __VLS_7;
}
var __VLS_3;
if (__VLS_ctx.appStore.leftMenuFilters.menuOpen) {
    const __VLS_12 = {}.VDivider;
    /** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    /** @type {[typeof Filters, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(Filters, new Filters({}));
    const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
}
const __VLS_19 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex justify-center my-1" },
});
const __VLS_23 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.appStore.leftMenuFilters.menuOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'),
    flat: true,
    variant: "text",
    size: "30px",
    color: "black",
}));
const __VLS_25 = __VLS_24({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.appStore.leftMenuFilters.menuOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'),
    flat: true,
    variant: "text",
    size: "30px",
    color: "black",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
let __VLS_27;
let __VLS_28;
let __VLS_29;
const __VLS_30 = {
    onClick: (...[$event]) => {
        __VLS_ctx.appStore.leftMenuFilters.menuOpen = !__VLS_ctx.appStore.leftMenuFilters.menuOpen;
    }
};
var __VLS_26;
/** @type {__VLS_StyleScopedClasses['left_menu']} */ ;
/** @type {__VLS_StyleScopedClasses['elevation-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-5']} */ ;
/** @type {__VLS_StyleScopedClasses['spinPulse']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['my-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            version: version,
            Filters: Filters,
            appStore: appStore,
            leftMenuStyle: leftMenuStyle,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
