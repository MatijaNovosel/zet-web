/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import LeftDrawer from "@/components/navigation/LeftDrawer.vue";
import RightDrawer from "@/components/navigation/RightDrawer.vue";
import { useAppStore } from "@/store/app";
import { useDisplay } from "vuetify";
import LeftMenu from "../components/navigation/LeftMenu.vue";
import RightMenu from "../components/navigation/RightMenu.vue";
import Alerts from "../components/notifications/Alerts.vue";
const { mobile } = useDisplay();
const appStore = useAppStore();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VLayout;
/** @type {[typeof __VLS_components.VLayout, typeof __VLS_components.vLayout, typeof __VLS_components.VLayout, typeof __VLS_components.vLayout, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
/** @type {[typeof Alerts, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(Alerts, new Alerts({}));
const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
if (__VLS_ctx.mobile) {
    /** @type {[typeof LeftDrawer, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(LeftDrawer, new LeftDrawer({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    if (__VLS_ctx.appStore.activeStop || __VLS_ctx.appStore.activeVehicle) {
        /** @type {[typeof RightDrawer, ]} */ ;
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(RightDrawer, new RightDrawer({}));
        const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
    }
}
else {
    /** @type {[typeof LeftMenu, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(LeftMenu, new LeftMenu({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    if (__VLS_ctx.appStore.activeStop || __VLS_ctx.appStore.activeVehicle) {
        /** @type {[typeof RightMenu, ]} */ ;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent(RightMenu, new RightMenu({}));
        const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
    }
}
const __VLS_20 = {}.VMain;
/** @type {[typeof __VLS_components.VMain, typeof __VLS_components.vMain, typeof __VLS_components.VMain, typeof __VLS_components.vMain, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    ...{ class: "main" },
}));
const __VLS_22 = __VLS_21({
    ...{ class: "main" },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
const __VLS_24 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
var __VLS_23;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['main']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LeftDrawer: LeftDrawer,
            RightDrawer: RightDrawer,
            LeftMenu: LeftMenu,
            RightMenu: RightMenu,
            Alerts: Alerts,
            mobile: mobile,
            appStore: appStore,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
