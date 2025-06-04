import { useNotifications } from "@/composables/useNotifications";
import { BACKEND_URL } from "@/constants/app";
import { useAppStore } from "@/store/app";
import axios from "axios";

const client = axios.create({
  baseURL: BACKEND_URL
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const { alert } = useNotifications();
    const appStore = useAppStore();
    alert({
      type: "error",
      text: "Dogodila se greška!"
    });
    appStore.loading = false;
    throw error;
  }
);

export default client;
