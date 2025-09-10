/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useNotificationStore } from "@/store/notification";
import { storeToRefs } from "pinia";
import Alert from "./Alert.vue";
const store = useNotificationStore();
const { alerts } = storeToRefs(store);
const removeAlert = (alert) => {
    store.removeAlert(alert);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.TransitionGroup;
/** @type {[typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "list",
    tag: "div",
    ...{ class: "alerts d-flex flex-column align-center" },
}));
const __VLS_2 = __VLS_1({
    name: "list",
    tag: "div",
    ...{ class: "alerts d-flex flex-column align-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
for (const [alert] of __VLS_getVForSourceType((__VLS_ctx.alerts))) {
    /** @type {[typeof Alert, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(Alert, new Alert({
        ...{ 'onClose': {} },
        key: (alert.timestamp),
        alert: (alert),
        ...{ class: "mb-3" },
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onClose': {} },
        key: (alert.timestamp),
        alert: (alert),
        ...{ class: "mb-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = {
        onClose: (...[$event]) => {
            __VLS_ctx.removeAlert(alert);
        }
    };
    var __VLS_7;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['alerts']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Alert: Alert,
            alerts: alerts,
            removeAlert: removeAlert,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
