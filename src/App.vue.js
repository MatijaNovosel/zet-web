/// <reference types="../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { SafeArea } from "@capacitor-community/safe-area";
import ConfirmationDialogProvider from "./components/confirmationDialog/ConfirmationDialogProvider.vue";
import { useAppStore } from "./store/app";
const appStore = useAppStore();
SafeArea.enable({
    config: {
        customColorsForSystemBars: true,
        statusBarColor: "#00000000",
        statusBarContent: "light",
        navigationBarColor: "#00000000",
        navigationBarContent: "light"
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VApp;
/** @type {[typeof __VLS_components.VApp, typeof __VLS_components.vApp, typeof __VLS_components.VApp, typeof __VLS_components.vApp, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VOverlay;
/** @type {[typeof __VLS_components.VOverlay, typeof __VLS_components.vOverlay, typeof __VLS_components.VOverlay, typeof __VLS_components.vOverlay, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    modelValue: (__VLS_ctx.appStore.loading),
    persistent: true,
    contained: true,
    zIndex: "2000",
    ...{ class: "align-center justify-center" },
}));
const __VLS_7 = __VLS_6({
    modelValue: (__VLS_ctx.appStore.loading),
    persistent: true,
    contained: true,
    zIndex: "2000",
    ...{ class: "align-center justify-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.VProgressCircular;
/** @type {[typeof __VLS_components.VProgressCircular, typeof __VLS_components.vProgressCircular, typeof __VLS_components.VProgressCircular, typeof __VLS_components.vProgressCircular, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    color: "orange",
    indeterminate: true,
    size: "160",
    width: "16",
}));
const __VLS_11 = __VLS_10({
    color: "orange",
    indeterminate: true,
    size: "160",
    width: "16",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ class: "spinPulse" },
    size: "70",
}));
const __VLS_15 = __VLS_14({
    ...{ class: "spinPulse" },
    size: "70",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
var __VLS_16;
var __VLS_12;
var __VLS_8;
/** @type {[typeof ConfirmationDialogProvider, typeof ConfirmationDialogProvider, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(ConfirmationDialogProvider, new ConfirmationDialogProvider({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
var __VLS_19;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['spinPulse']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ConfirmationDialogProvider: ConfirmationDialogProvider,
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
