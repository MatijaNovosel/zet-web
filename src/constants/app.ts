import i18n from "@/i18n";
import { computed } from "vue";

export const THEME_OPTIONS = computed(() => [
  {
    title: i18n.global.t("dark"),
    value: "dark"
  },
  {
    title: i18n.global.t("light"),
    value: "light"
  }
]);

export const LANGUAGE_OPTIONS = computed(() => [
  {
    title: i18n.global.t("languages.en"),
    value: "en"
  },
  {
    title: i18n.global.t("languages.hr"),
    value: "hr"
  }
]);

export const MAX_FILE_SIZE = 10_000_000;

export const BACKEND_URL = import.meta.env.VITE_BACKEND_API as string;
export const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY as string;
export const DEFAULT_LOCATION = [45.7916835085198, 15.974145329448914]; // Zagreb
