import { inject } from "vue";
export const CreateConfirmDialogKey = Symbol("CreateConfirmDialogKey");
export const useConfirmationDialog = () => {
    const dialog = inject(CreateConfirmDialogKey);
    if (!dialog)
        throw new Error("Could not resolve provider");
    return dialog;
};
export const ConfirmationDialogTypeIcon = {
    success: "mdi-checkbox-marked",
    info: "mdi-alert-circle",
    warning: "mdi-alert-box",
    error: "mdi-alert-rhombus"
};
