import { onMounted } from "vue";
const props = defineProps();
const emits = defineEmits();
const close = () => {
    emits("close");
};
onMounted(() => {
    if (props.alert.autoclose) {
        setTimeout(close, props.alert.timeout);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VAlert;
/** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: (props.alert.closable ? 'pl-8' : '') },
    ...{ class: "py-1 px-6 unselectable elevation-5" },
    density: "compact",
    rounded: "lg",
    color: (props.alert.type),
    width: "fit-content",
    modelValue: (props.alert.value),
}));
const __VLS_2 = __VLS_1({
    ...{ class: (props.alert.closable ? 'pl-8' : '') },
    ...{ class: "py-1 px-6 unselectable elevation-5" },
    density: "compact",
    rounded: "lg",
    color: (props.alert.type),
    width: "fit-content",
    modelValue: (props.alert.value),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-subtitle-1" },
});
(props.alert.text);
if (props.alert.closable) {
    {
        const { append: __VLS_thisSlot } = __VLS_3.slots;
        const __VLS_5 = {}.VBtn;
        /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
            ...{ 'onClick': {} },
            variant: "text",
            color: "white",
            icon: "mdi-close",
        }));
        const __VLS_7 = __VLS_6({
            ...{ 'onClick': {} },
            variant: "text",
            color: "white",
            icon: "mdi-close",
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        let __VLS_9;
        let __VLS_10;
        let __VLS_11;
        const __VLS_12 = {
            onClick: (__VLS_ctx.close)
        };
        var __VLS_8;
    }
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['unselectable']} */ ;
/** @type {__VLS_StyleScopedClasses['elevation-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            close: close,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
