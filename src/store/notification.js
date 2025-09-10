import { defineStore } from "pinia";
import { ref } from "vue";
export const useNotificationStore = defineStore("notification", () => {
    const alerts = ref([]);
    const addAlert = (alert) => {
        if (!alerts.value.some((a) => a.id === alert.id)) {
            alerts.value.push(alert);
        }
    };
    const removeAlert = (alert) => {
        const indexToDelete = alerts.value.findIndex((n) => n.id === alert.id);
        if (indexToDelete !== -1) {
            alerts.value.splice(indexToDelete, 1);
        }
    };
    return {
        alerts,
        removeAlert,
        addAlert
    };
});
