import { createI18n } from "vue-i18n";
import { en, hr } from "vuetify/locale";
import enApp from "./en";
import hrApp from "./hr";

export default createI18n({
  legacy: false,
  locale: "en",
  messages: {
    hr: {
      $vuetify: {
        ...hr
      },
      ...hrApp
    },
    en: {
      $vuetify: {
        ...en
      },
      ...enApp
    }
  },
  fallbackLocale: "en",
  silentFallbackWarn: true
});
