/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useAppStore } from "@/store/app";
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { version } from "../../../package.json";
import Filters from "../filters/Filters.vue";
const appStore = useAppStore();
const { mobile } = useDisplay();
const drawer = ref(false);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.mobile && !__VLS_ctx.drawer) {
    const __VLS_0 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        icon: "mdi-menu",
        color: "white",
        size: (40),
        ...{ class: "drawer_btn" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        icon: "mdi-menu",
        color: "white",
        size: (40),
        ...{ class: "drawer_btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.mobile && !__VLS_ctx.drawer))
                return;
            __VLS_ctx.drawer = !__VLS_ctx.drawer;
        }
    };
    var __VLS_3;
}
const __VLS_8 = {}.VNavigationDrawer;
/** @type {[typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    order: (1),
    modelValue: (__VLS_ctx.drawer),
    mobile: true,
}));
const __VLS_10 = __VLS_9({
    order: (1),
    modelValue: (__VLS_ctx.drawer),
    mobile: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_11.slots;
    const __VLS_12 = {}.VListItem;
    /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        title: "ZET Web",
        subtitle: (__VLS_ctx.version),
        ...{ class: "text-subtitle-2 py-3" },
    }));
    const __VLS_14 = __VLS_13({
        title: "ZET Web",
        subtitle: (__VLS_ctx.version),
        ...{ class: "text-subtitle-2 py-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    {
        const { prepend: __VLS_thisSlot } = __VLS_15.slots;
        const __VLS_16 = {}.VProgressCircular;
        /** @type {[typeof __VLS_components.VProgressCircular, typeof __VLS_components.vProgressCircular, typeof __VLS_components.VProgressCircular, typeof __VLS_components.vProgressCircular, ]} */ ;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
            color: "blue",
            modelValue: (__VLS_ctx.appStore.progress),
            ...{ class: "mr-5" },
        }));
        const __VLS_18 = __VLS_17({
            color: "blue",
            modelValue: (__VLS_ctx.appStore.progress),
            ...{ class: "mr-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_17));
        __VLS_19.slots.default;
        const __VLS_20 = {}.VIcon;
        /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            ...{ class: "spinPulse" },
            size: "15",
        }));
        const __VLS_22 = __VLS_21({
            ...{ class: "spinPulse" },
            size: "15",
        }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        __VLS_23.slots.default;
        var __VLS_23;
        var __VLS_19;
    }
    {
        const { append: __VLS_thisSlot } = __VLS_15.slots;
        const __VLS_24 = {}.VBtn;
        /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
            ...{ 'onClick': {} },
            icon: "mdi-close",
            variant: "text",
            color: "black",
            size: (35),
        }));
        const __VLS_26 = __VLS_25({
            ...{ 'onClick': {} },
            icon: "mdi-close",
            variant: "text",
            color: "black",
            size: (35),
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        let __VLS_28;
        let __VLS_29;
        let __VLS_30;
        const __VLS_31 = {
            onClick: (...[$event]) => {
                __VLS_ctx.drawer = !__VLS_ctx.drawer;
            }
        };
        var __VLS_27;
    }
    var __VLS_15;
}
const __VLS_32 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
/** @type {[typeof Filters, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(Filters, new Filters({}));
const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['drawer_btn']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-5']} */ ;
/** @type {__VLS_StyleScopedClasses['spinPulse']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            version: version,
            Filters: Filters,
            appStore: appStore,
            mobile: mobile,
            drawer: drawer,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
