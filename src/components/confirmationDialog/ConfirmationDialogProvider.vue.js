/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { provide, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { ConfirmationDialogTypeIcon, CreateConfirmDialogKey } from "../../composables/useConfirmationDialog";
const i18n = useI18n();
const state = reactive({
    isOpen: false,
    resolve: (_val) => {
        //
    },
    reject: (_val) => {
        //
    },
    options: {
        width: 400,
        showCancel: true,
        persistent: false,
        centerContent: true,
        title: `${i18n.t("areYouSure")}?`,
        type: "success"
    }
});
const createConfirmDialog = (options = {
    title: `${i18n.t("areYouSure")}?`,
    persistent: true
}) => {
    state.isOpen = true;
    state.options = Object.assign(state.options, options);
    return new Promise((resolve, reject) => {
        state.resolve = resolve;
        state.reject = reject;
    });
};
provide(CreateConfirmDialogKey, createConfirmDialog);
const agree = () => {
    state.resolve(true);
    state.isOpen = false;
};
const cancel = () => {
    state.resolve(false);
    state.isOpen = false;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "display-contents" },
});
var __VLS_0 = {};
const __VLS_2 = {}.VDialog;
/** @type {[typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(__VLS_2, new __VLS_2({
    modelValue: (__VLS_ctx.state.isOpen),
    maxWidth: (__VLS_ctx.state.options.width),
    persistent: (__VLS_ctx.state.options.persistent),
}));
const __VLS_4 = __VLS_3({
    modelValue: (__VLS_ctx.state.isOpen),
    maxWidth: (__VLS_ctx.state.options.width),
    persistent: (__VLS_ctx.state.options.persistent),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_5.slots.default;
const __VLS_6 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    ...{ class: "pt-3" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "pt-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_9.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex align-center px-4" },
    ...{ class: ({
            'py-4': !__VLS_ctx.state.options.content,
            'pt-4': !!__VLS_ctx.state.options.content
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_10 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    color: (__VLS_ctx.state.options.type),
    size: "80",
}));
const __VLS_12 = __VLS_11({
    color: (__VLS_ctx.state.options.type),
    size: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_13.slots.default;
(__VLS_ctx.state.options.icon || __VLS_ctx.ConfirmationDialogTypeIcon[__VLS_ctx.state.options.type || "success"]);
var __VLS_13;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pl-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-h6 font-weight-bold" },
});
(__VLS_ctx.state.options.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-subtitle-1 pt-5 pb-6" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!!__VLS_ctx.state.options.content) }, null, null);
(__VLS_ctx.state.options.content);
const __VLS_14 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const __VLS_18 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    ...{ class: "py-3 justify-end pr-5" },
}));
const __VLS_20 = __VLS_19({
    ...{ class: "py-3 justify-end pr-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    ...{ 'onClick': {} },
    color: "red",
    variant: "flat",
    rounded: "4",
    text: (__VLS_ctx.i18n.t('no')),
}));
const __VLS_24 = __VLS_23({
    ...{ 'onClick': {} },
    color: "red",
    variant: "flat",
    rounded: "4",
    text: (__VLS_ctx.i18n.t('no')),
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
let __VLS_26;
let __VLS_27;
let __VLS_28;
const __VLS_29 = {
    onClick: (__VLS_ctx.cancel)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!!__VLS_ctx.state.options.showCancel) }, null, null);
var __VLS_25;
const __VLS_30 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    ...{ 'onClick': {} },
    color: "success",
    variant: "flat",
    rounded: "4",
    text: (__VLS_ctx.i18n.t('yes')),
}));
const __VLS_32 = __VLS_31({
    ...{ 'onClick': {} },
    color: "success",
    variant: "flat",
    rounded: "4",
    text: (__VLS_ctx.i18n.t('yes')),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_34;
let __VLS_35;
let __VLS_36;
const __VLS_37 = {
    onClick: (__VLS_ctx.agree)
};
var __VLS_33;
var __VLS_21;
var __VLS_9;
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['display-contents']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-5']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ConfirmationDialogTypeIcon: ConfirmationDialogTypeIcon,
            i18n: i18n,
            state: state,
            agree: agree,
            cancel: cancel,
        };
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
